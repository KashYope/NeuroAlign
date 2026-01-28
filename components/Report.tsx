
import React, { useState } from 'react';
import { ScreeningReport, Locale, Phase, UserAnswer } from '../types';
import { translations } from '../i18n';
import { QUESTIONS } from '../questions';

interface ReportProps {
  report: ScreeningReport;
  answers: UserAnswer[];
  onReset: () => void;
  locale: Locale;
}

const Report: React.FC<ReportProps> = ({ report, answers, onReset, locale }) => {
  const t = translations[locale];
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const primaryDomains = report.domainScores.filter(d => 
    [Phase.AUTISM, Phase.ADHD].includes(d.name as Phase)
  );
  const specializedDomains = report.domainScores.filter(d => 
    [Phase.DYSLEXIA, Phase.DYSCALCULIA, Phase.DYSPRAXIA, Phase.LANGUAGE].includes(d.name as Phase)
  );
  const wellbeingDomains = report.domainScores.filter(d => 
    d.name === Phase.COMORBIDITIES
  );

  const generateDetailedPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const { jsPDF } = await import('https://esm.sh/jspdf@^2.5.1');
      const autoTableModule = await import('https://esm.sh/jspdf-autotable@^3.8.2');
      const autoTable = autoTableModule.default;

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;

      // Header Banner
      doc.setFillColor(79, 70, 229); // indigo-600
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text(t.reportTitle, margin, 25);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const dateStr = new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR');
      doc.text(dateStr, pageWidth - margin - 30, 25);

      // Intro
      let currentY = 55;
      doc.setTextColor(71, 85, 105);
      doc.setFontSize(10);
      const splitDesc = doc.splitTextToSize(t.reportDesc, pageWidth - (margin * 2));
      doc.text(splitDesc, margin, currentY);
      currentY += (splitDesc.length * 6) + 15;

      // Clinical Flags Section
      if (report.flags.length > 0) {
        const flagHeight = (report.flags.length * 8) + 15;
        doc.setFillColor(255, 241, 242); // rose-50
        doc.rect(margin, currentY, pageWidth - (margin * 2), flagHeight, 'F');
        doc.setTextColor(159, 18, 57); // rose-900
        doc.setFont('helvetica', 'bold');
        doc.text(t.keyFindings, margin + 5, currentY + 10);
        doc.setFont('helvetica', 'normal');
        report.flags.forEach((flag, i) => {
          doc.text(`- ${(t as any)[flag] || flag}`, margin + 8, currentY + 20 + (i * 8));
        });
        currentY += flagHeight + 15;
      }

      // Domain Scores Summary Table
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(t.coreProfiles, margin, currentY);
      currentY += 10;

      const domainTableData = report.domainScores.map(d => [
        (t.phases as any)[d.name] || d.name,
        `${d.score}%`,
        (t.interpretations as any)[d.interpretation] || d.interpretation
      ]);

      autoTable(doc, {
        startY: currentY,
        head: [[locale === 'en' ? 'Domain' : 'Domaine', 'Score', 'Interpretation']],
        body: domainTableData,
        theme: 'striped',
        headStyles: { fillColor: [79, 70, 229] },
        margin: { left: margin, right: margin }
      });
      
      currentY = (doc as any).lastAutoTable.finalY + 20;

      // Check if we need a new page for Impact
      if (currentY > 230) { doc.addPage(); currentY = 25; }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(t.functionalImpactTitle, margin, currentY);
      currentY += 10;

      const impactData = Object.entries(report.functionalImpact).map(([id, val]) => {
        const label = (t.impactLabels as any)[id] || id;
        const level = val >= 4 ? t.barrierLevels.significant : val >= 3 ? t.barrierLevels.moderate : t.barrierLevels.typical;
        return [label, `${val}/5`, level];
      });

      autoTable(doc, {
        startY: currentY,
        head: [[locale === 'en' ? 'Functional Area' : 'Domaine', 'Score', 'Impact']],
        body: impactData,
        theme: 'grid',
        headStyles: { fillColor: [30, 41, 59] },
        margin: { left: margin, right: margin }
      });

      // Answer Log on New Page
      doc.addPage();
      doc.setTextColor(79, 70, 229);
      doc.setFontSize(18);
      doc.text(locale === 'en' ? 'Full Item Response Log' : 'Journal des réponses complet', margin, 25);
      
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(t.reportFooter, margin, 35);

      const allAnswersData = QUESTIONS.map(q => {
        const userAns = answers.find(a => a.questionId === q.id);
        const score = userAns ? userAns.score : '-';
        const phaseLabel = (t.phases as any)[q.phase] || q.phase;
        return [q.id, phaseLabel, q.text[locale], score];
      });

      autoTable(doc, {
        startY: 45,
        head: [['ID', locale === 'en' ? 'Domain' : 'Domaine', locale === 'en' ? 'Item' : 'Item', 'Score']],
        body: allAnswersData,
        styles: { fontSize: 7, cellPadding: 2 },
        columnStyles: {
          0: { cellWidth: 12 },
          1: { cellWidth: 35 },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 15, halign: 'center' }
        },
        headStyles: { fillColor: [71, 85, 105] },
        margin: { left: margin, right: margin, bottom: 20 }
      });

      doc.save(`NeuroAlign_Assessment_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert(locale === 'en' ? "Could not generate PDF. Please try checking your connection." : "Impossible de générer le PDF. Veuillez vérifier votre connexion.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const renderDomainCard = (domain: any) => (
    <div key={domain.name} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-10">
        <div className="pr-4">
          <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">{(t.phases as any)[domain.name] || domain.name}</h3>
          <div className="flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${domain.score > 60 ? 'bg-rose-500' : domain.score > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {(t.interpretations as any)[domain.interpretation] || domain.interpretation}
            </p>
          </div>
        </div>
        <div className={`text-3xl font-black p-5 rounded-[2rem] min-w-[80px] text-center ${
          domain.score > 60 ? 'bg-rose-50 text-rose-600' : domain.score > 40 ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'
        }`}>
          {domain.score}%
        </div>
      </div>

      <div className="space-y-6 mt-auto">
        {Object.entries(domain.subscales).map(([name, score]: [string, any]) => (
          <div key={name}>
            <div className="flex justify-between text-[10px] font-black text-slate-500 mb-2 uppercase tracking-tighter">
              <span>{(t.subscales as any)[name] || name}</span>
              <span>{score}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  score > 60 ? 'bg-rose-400' : score > 40 ? 'bg-amber-400' : 'bg-indigo-400'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="mb-20 text-center">
        <div className="inline-block px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8">
          {t.preliminaryResults}
        </div>
        <h1 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter">{t.reportTitle}</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
          {t.reportDesc}
        </p>
      </header>

      {report.flags.length > 0 && (
        <section className="mb-16 p-10 bg-rose-50/50 border border-rose-100 rounded-[3rem] relative overflow-hidden">
          <h2 className="text-rose-900 font-black text-xs uppercase tracking-[0.3em] mb-8">{t.keyFindings}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.flags.map((flagKey, i) => (
              <li key={i} className="px-6 py-4 bg-white border border-rose-100 rounded-2xl text-rose-800 text-sm font-bold shadow-sm flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                {(t as any)[flagKey] || flagKey}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        {primaryDomains.map(renderDomainCard)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {specializedDomains.map(renderDomainCard)}
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        <div className="lg:col-span-1 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10">{t.wellbeingTitle}</h2>
          <div className="space-y-10">
            {wellbeingDomains.map(d => (
              <div key={d.name} className="space-y-6">
                {Object.entries(d.subscales).map(([name, score]: [string, any]) => (
                  <div key={name}>
                    <div className="flex justify-between text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">
                      <span>{(t.subscales as any)[name] || name}</span>
                      <span className={score > 60 ? 'text-rose-500' : ''}>{score}%</span>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full">
                      <div className={`h-full rounded-full transition-all duration-1000 ${score > 60 ? 'bg-rose-400' : 'bg-indigo-400'}`} style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl">
          <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em] mb-12">{t.functionalImpactTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {Object.entries(report.functionalImpact).map(([id, val]) => {
              const impactLabel = (t.impactLabels as any)[id] || id;
              const percentage = (val / 5) * 100;
              return (
                <div key={id} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold tracking-tight text-slate-300">{impactLabel}</span>
                    <span className="text-xs font-black text-indigo-400">{val}/5</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${val >= 4 ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-12">
        <button 
          onClick={generateDetailedPdf}
          disabled={isGeneratingPdf}
          className="w-full sm:w-auto px-12 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
        >
          {isGeneratingPdf ? '...' : t.downloadPdf}
        </button>
        <button 
          onClick={onReset}
          className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all active:scale-95"
        >
          {t.retake}
        </button>
      </div>

      <footer className="mt-20 py-12 text-center border-t border-slate-100 flex flex-col items-center gap-2">
        <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black">{t.reportFooter}</p>
        <p className="text-xs font-medium text-slate-400">Vibe coded by Kash 🦄 - 2026 - Sharing is caring ❤️</p>
      </footer>
    </div>
  );
};

export default Report;
