import React, { useState, useRef } from 'react';
import { ScreeningReport, Locale, Phase, UserAnswer, Translation } from '../types';
import { translations } from '../i18n';
import { QUESTIONS } from '../questions';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ModuleIcon from './ModuleIcon';
import { Check, AlertTriangle, Copy, ArrowRight, Wrench } from 'lucide-react';
import QRCode from 'qrcode';
import { encodeAnswers } from '../utils/sharing';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';

// Register ChartJS modules
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface ReportProps {
  report: ScreeningReport;
  answers: UserAnswer[];
  onReset: () => void;
  onReview?: () => void;
  locale: Locale;
}

const Report: React.FC<ReportProps> = ({ report, answers, onReset, onReview, locale }) => {
  const t: Translation = translations[locale];
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const radarChartRef = useRef<any>(null);
  const barChartRef = useRef<any>(null);

  const allDomains = report.domainScores.filter(d => d.name !== Phase.COMORBIDITIES);
  const wellbeingDomains = report.domainScores.filter(d => d.name === Phase.COMORBIDITIES);

  const radarLabels = allDomains.map(d => {
    const label = t.phases[d.name] || d.name;
    if (label.includes(' & ')) return label.split(' & ');
    if (label.includes(' (')) {
      const parts = label.split(' (');
      return [parts[0], `(${parts[1]}`];
    }
    if (label.length > 15) {
      const words = label.split(' ');
      if (words.length > 1) {
        const mid = Math.ceil(words.length / 2);
        return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
      }
    }
    return label;
  });

  const radarData = {
    labels: radarLabels,
    datasets: [
      {
        label: t.chart.intensity,
        data: allDomains.map(d => d.score),
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(79, 70, 229, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(79, 70, 229, 1)',
      },
    ],
  };

  const radarOptions = {
    layout: { padding: { top: 20, bottom: 20, left: 35, right: 35 } },
    scales: {
      r: {
        angleLines: { display: true, color: 'rgba(0,0,0,0.1)' },
        grid: { color: 'rgba(0,0,0,0.06)' },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { stepSize: 20, display: false },
        pointLabels: {
          font: { size: window.innerWidth < 640 ? 7 : 9, weight: 'bold' as const, family: 'Inter' },
          color: '#334155',
          padding: 10
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 12 },
        cornerRadius: 12
      }
    },
    maintainAspectRatio: true,
    responsive: true
  };

  const impactEntries = Object.entries(report.functionalImpact) as [string, number][];
  const barData = {
    labels: impactEntries.map(([id]) => t.impactLabels[id] || id),
    datasets: [
      {
        label: t.chart.barrierLevel,
        data: impactEntries.map(([, val]) => val),
        backgroundColor: impactEntries.map(([, val]) => val >= 4 ? '#f43f5e' : '#818cf8'),
        borderRadius: 8,
        barThickness: 24,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y' as const,
    scales: {
      x: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1, color: '#94a3b8', font: { weight: 'bold' as const } },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#f8fafc', font: { weight: 'bold' as const, size: 11 }, padding: 12 }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#000',
        padding: 10,
        titleFont: { size: 13, weight: 'bold' as const },
        bodyFont: { size: 12 }
      }
    },
    maintainAspectRatio: false
  };

  const generateMedicalSearchQuery = async () => {
    if (!city.trim() || !country.trim()) {
      alert(locale === 'en' ? 'Please enter both city and country' : 'Veuillez saisir la ville et le pays');
      return;
    }



    // Build the search query based on profile
    let conditions: string[] = [];
    allDomains.forEach(d => {
      if (d.score >= 60) {
        const domainName = t.phases[d.name] || d.name;
        conditions.push(domainName);
      }
    });

    const conditionsStr = conditions.length > 0 ? conditions.join(' ') : 'neurodiversity';
    // Use translated search terms
    const searchQuery = `${conditionsStr} ${t.searchTerms.specialist} ${t.searchTerms.psychologist} ${t.searchTerms.psychiatrist} ${t.searchTerms.assessment} ${city} ${country}`;

    try {
      await navigator.clipboard.writeText(searchQuery);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      alert(locale === 'en'
        ? `Search query: ${searchQuery}`
        : `Requête de recherche : ${searchQuery}`);
    }
  };

  const generateDetailedPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      // 1. Generate QR Code
      const encodedAnswers = encodeAnswers(answers);
      const qrDataUrl = await QRCode.toDataURL(encodedAnswers, { margin: 1, width: 100, errorCorrectionLevel: 'L' });

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let currentY = 0;

      // --- HELPER: HEADER ---
      const addHeader = (title: string, yPos: number = 25) => {
        doc.setFillColor(79, 70, 229);
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text(title, margin, yPos);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const dateStr = new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR');
        // Position date to the left of the QR code
        doc.text(dateStr, pageWidth - margin - 50, yPos);

        // Add QR Code
        doc.setFillColor(255, 255, 255);
        doc.rect(pageWidth - margin - 25, 8, 24, 24, 'F');
        doc.addImage(qrDataUrl, 'PNG', pageWidth - margin - 24, 9, 22, 22);
      };

      // --- HELPER: PAGE BREAK CHECK ---
      const checkPageBreak = (neededHeight: number) => {
        if (currentY + neededHeight > pageHeight - margin) {
          doc.addPage();
          addHeader(t.reportTitle);
          currentY = 55;
          return true;
        }
        return false;
      };

      // --- PART 1: USER REPORT ---
      addHeader(t.reportTitle);
      currentY = 55;

      // Intro Text
      doc.setTextColor(71, 85, 105);
      doc.setFontSize(10);
      const splitDesc = doc.splitTextToSize(t.reportDesc, pageWidth - (margin * 2));
      doc.text(splitDesc, margin, currentY);
      currentY += (splitDesc.length * 6) + 15;

      // URGENT BANNER IF APPLICABLE
      if (report.isClinicalUrgent) {
        doc.setFillColor(254, 242, 242); // rose-50
        doc.rect(margin, currentY, pageWidth - (margin * 2), 25, 'F');
        doc.setDrawColor(254, 205, 211); // rose-200
        doc.rect(margin, currentY, pageWidth - (margin * 2), 25, 'S');

        doc.setTextColor(159, 18, 57); // rose-900
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(t.urgentFlag.toUpperCase(), margin + 5, currentY + 10);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const splitUrgent = doc.splitTextToSize(t.urgentDesc, pageWidth - (margin * 2) - 10);
        doc.text(splitUrgent, margin + 5, currentY + 16);

        currentY += 35;
      }

      // RADAR CHART IMAGE
      if (radarChartRef.current) {
        try {
          const radarImg = radarChartRef.current.toBase64Image();
          const imgSize = 120; // Square aspect ratio to prevent distortion
          const xPos = (pageWidth - imgSize) / 2;

          checkPageBreak(imgSize + 20);
          doc.addImage(radarImg, 'PNG', xPos, currentY, imgSize, imgSize);
          currentY += imgSize + 10;
        } catch (e) {
          console.error("Could not capture radar chart", e);
        }
      }

      // Flags
      if (report.flags.length > 0) {
        const flagLines = report.flags.length;
        const flagBlockHeight = (flagLines * 8) + 25; // padding + title

        checkPageBreak(flagBlockHeight);

        doc.setFillColor(255, 241, 242);
        doc.rect(margin, currentY, pageWidth - (margin * 2), flagBlockHeight, 'F');
        doc.setTextColor(159, 18, 57);
        doc.setFont('helvetica', 'bold');
        doc.text(t.keyFindings, margin + 5, currentY + 10);
        doc.setFont('helvetica', 'normal');
        report.flags.forEach((flag, i) => {
          doc.text(`- ${(t as any)[flag] || flag}`, margin + 8, currentY + 20 + (i * 8));
        });
        currentY += flagBlockHeight + 15;
      }

      // Insight Sections (Only for Score >= 40)
      const significantDomains = allDomains.filter(d => d.score >= 40);

      const mapKey = (phase: string) => {
        if (phase === Phase.ADHD) return 'adhd';
        if (phase === Phase.AUTISM) return 'autism';
        if (phase === Phase.DYSLEXIA) return 'dyslexia';
        if (phase === Phase.DYSPRAXIA) return 'dyspraxia';
        if (phase === Phase.DYSCALCULIA) return 'dyscalculia';
        return null;
      };

      for (const domain of significantDomains) {
        const key = mapKey(domain.name);
        // @ts-ignore
        const info = key ? t.insights[key] : null;

        if (info) {
          // Domain Header Block needs ~30 units
          checkPageBreak(50);

          // Domain Header
          doc.setFillColor(241, 245, 249); // slate-100
          doc.rect(margin, currentY, pageWidth - (margin * 2), 15, 'F');

          doc.setTextColor(15, 23, 42);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(14);
          const domainName = t.phases[domain.name] || domain.name;
          doc.text(`${domainName} (${domain.score}%)`, margin + 5, currentY + 10);
          currentY += 25;

          // Lived Experience
          doc.setFontSize(10);
          doc.setTextColor(79, 70, 229); // Indigo
          doc.text(t.reportLabels.livedExperience.toUpperCase(), margin, currentY);
          currentY += 6;

          doc.setTextColor(51, 65, 85);
          doc.setFont('helvetica', 'normal');
          const livedExp = doc.splitTextToSize(info.whatItMeans, pageWidth - (margin * 2));

          // Check if lived experience text fits
          if (checkPageBreak(livedExp.length * 6 + 10)) {
            // If we broke page, reprint header? No, just continue text
          }
          doc.text(livedExp, margin, currentY);
          currentY += (livedExp.length * 6) + 10;

          // Strengths
          checkPageBreak(40); // Ensure header + some strengths fit
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(79, 70, 229);
          doc.text(t.reportLabels.neuroStrengths.toUpperCase(), margin, currentY);
          currentY += 6;

          doc.setTextColor(51, 65, 85);
          doc.setFont('helvetica', 'normal');
          info.strengths.forEach((s: string) => {
            checkPageBreak(8);
            doc.text(`• ${s}`, margin + 5, currentY);
            currentY += 6;
          });
          currentY += 5;

          // Strategies
          checkPageBreak(40);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(79, 70, 229);
          doc.text(t.reportLabels.strategies.toUpperCase(), margin, currentY);
          currentY += 6;

          doc.setTextColor(51, 65, 85);
          doc.setFont('helvetica', 'normal');
          info.tips.forEach((tip: string) => {
            const tipLines = doc.splitTextToSize(`• ${tip}`, pageWidth - (margin * 2) - 5);
            checkPageBreak(tipLines.length * 6 + 4);
            doc.text(tipLines, margin + 5, currentY);
            currentY += (tipLines.length * 6) + 2;
          });
          currentY += 5;

          // Tools
          if (info.tools && info.tools.length > 0) {
            checkPageBreak(40);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(79, 70, 229);
            doc.text(t.reportLabels.tools.toUpperCase(), margin, currentY);
            currentY += 6;

            doc.setTextColor(51, 65, 85);
            doc.setFont('helvetica', 'normal');
            info.tools.forEach((tool: string) => {
              const toolLines = doc.splitTextToSize(`• ${tool}`, pageWidth - (margin * 2) - 5);
              checkPageBreak(toolLines.length * 6 + 4);
              doc.text(toolLines, margin + 5, currentY);
              currentY += (toolLines.length * 6) + 2;
            });
            currentY += 5;
          }

          // Guides
          if (info.guides && info.guides.length > 0) {
            checkPageBreak(40);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(79, 70, 229);
            doc.text(t.reportLabels.guides.toUpperCase(), margin, currentY);
            currentY += 6;

            doc.setTextColor(51, 65, 85);
            doc.setFont('helvetica', 'normal');
            info.guides.forEach((guide: string) => {
              const guideLines = doc.splitTextToSize(`• ${guide}`, pageWidth - (margin * 2) - 5);
              checkPageBreak(guideLines.length * 6 + 4);
              doc.text(guideLines, margin + 5, currentY);
              currentY += (guideLines.length * 6) + 2;
            });
            currentY += 5;
          }

          // Subscale Breakdown
          checkPageBreak(30);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(79, 70, 229);
          doc.text(t.reportLabels.subscaleBreakdown.toUpperCase(), margin, currentY);
          currentY += 6;

          doc.setTextColor(51, 65, 85);
          doc.setFont('helvetica', 'normal');
          Object.entries(domain.subscales).forEach(([sub, score]) => {
            checkPageBreak(8);
            doc.text(`- ${sub}: ${score}%`, margin + 5, currentY);
            currentY += 6;
          });

          currentY += 15; // Spacer between domains
        }
      }

      // FUNCTIONAL IMPACT CHART (If exists)
      if (impactEntries.length > 0 && barChartRef.current) {
        doc.addPage();
        addHeader(t.functionalImpactTitle);
        currentY = 55;

        try {
          const barImg = barChartRef.current.toBase64Image();
          // Landscape-ish bar chart
          const imgWidth = pageWidth - (margin * 2);
          const imgHeight = 80;
          doc.addImage(barImg, 'PNG', margin, currentY, imgWidth, imgHeight);
          currentY += imgHeight + 20;
        } catch (e) {
          console.error("Could not capture bar chart", e);
        }
      }

      // --- PART 2: MEDICAL APPENDICES ---
      doc.addPage();
      addHeader("Clinical Appendix & Log");
      currentY = 55;

      // Scores Table
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(t.coreProfiles, margin, currentY);
      currentY += 10;

      const domainTableData = report.domainScores.map(d => [
        t.phases[d.name] || d.name,
        `${d.score}%`,
        t.interpretations[d.interpretation] || d.interpretation
      ]);

      autoTable(doc, {
        startY: currentY,
        head: [[t.chart.domain, t.chart.score, t.chart.interpretation]],
        body: domainTableData,
        theme: 'striped',
        headStyles: { fillColor: [79, 70, 229] },
        margin: { left: margin, right: margin }
      });

      // @ts-ignore
      currentY = doc.lastAutoTable.finalY + 20;

      // Full Answer Log
      checkPageBreak(30);
      doc.text(t.chart.fullLog, margin, currentY);
      currentY += 10;

      const allAnswersData = QUESTIONS.map(q => {
        const userAns = answers.find(a => a.questionId === q.id);
        const score = userAns ? userAns.score : '-';
        const phaseLabel = t.phases[q.phase] || q.phase;
        // Handle long question text
        return [q.id, phaseLabel, q.text[locale], score];
      });

      autoTable(doc, {
        startY: currentY,
        head: [['ID', t.chart.domain, t.chart.item, t.chart.score]],
        body: allAnswersData,
        styles: { fontSize: 8, cellPadding: 2 },
        columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 35 }, 2: { cellWidth: 'auto' }, 3: { cellWidth: 20, halign: 'center' } },
        headStyles: { fillColor: [71, 85, 105] },
        margin: { left: margin, right: margin, bottom: 20 }
      });

      doc.save(`NeuroAlign_Assessment_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      // alert(t.errors.pdf); // Suppress alert for better UX, logic ok
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const InsightBlock: React.FC<{ domain: any, contentKey: string }> = ({ domain, contentKey }) => {
    // Map Phase name to i18n insights key (e.g. 'ADHD' -> 'adhd', 'Autism Spectrum' -> 'autism')
    const mapKey = (phase: string) => {
      if (phase === Phase.ADHD) return 'adhd';
      if (phase === Phase.AUTISM) return 'autism';
      if (phase === Phase.DYSLEXIA) return 'dyslexia';
      if (phase === Phase.DYSPRAXIA) return 'dyspraxia';
      if (phase === Phase.DYSCALCULIA) return 'dyscalculia';
      return null;
    };

    const key = mapKey(domain.name);
    // @ts-ignore
    const info = key ? t.insights[key] : null;

    if (!info) return null;

    // Only display insights if the score is significant (e.g., > 40%)
    if (domain.score < 40) return null;

    const bgClass = domain.score > 60 ? 'bg-rose-50 border-rose-100' : domain.score > 40 ? 'bg-amber-50 border-amber-100' : 'bg-indigo-50 dark:bg-indigo-900/50 border-indigo-100 dark:border-indigo-900';
    const textClass = domain.score > 60 ? 'text-rose-900' : domain.score > 40 ? 'text-amber-900' : 'text-indigo-900';

    return (
      <div className={`mt-8 p-6 sm:p-8 rounded-3xl border ${bgClass}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className={`text-xs font-black uppercase tracking-widest ${textClass} mb-4 opacity-70`}>{t.reportLabels.livedExperience}</h4>
            <p className={`text-sm sm:text-base leading-relaxed font-medium ${textClass}`}>
              {info.whatItMeans}
            </p>
          </div>
          <div>
            <h4 className={`text-xs font-black uppercase tracking-widest ${textClass} mb-4 opacity-70`}>{t.reportLabels.neuroStrengths}</h4>
            <ul className="space-y-2">
              {info.strengths.map((s: string, i: number) => (
                <li key={i} className={`flex items-start gap-2 text-sm font-bold ${textClass}`}>
                  <Check className="w-4 h-4 mt-0.5 opacity-60" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Unified Practical Support Section */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 border border-black/5">
          <h4 className={`text-xs font-black uppercase tracking-widest ${textClass} mb-6 opacity-70`}>{t.reportLabels.practicalSupport}</h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Quick Actions (Tips) */}
            <div>
              <h5 className={`text-[10px] uppercase font-bold opacity-60 mb-4 ${textClass}`}>{t.reportLabels.quickActions}</h5>
              <ul className="space-y-3">
                {info.tips.map((tip: string, i: number) => (
                  <li key={i} className={`flex items-start gap-3 text-sm font-medium ${textClass}`}>
                    <ArrowRight className="w-4 h-4 mt-1 opacity-50 shrink-0" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deep Dives (Guides) - if available */}
            {info.guides && info.guides.length > 0 && (
              <div>
                <h5 className={`text-[10px] uppercase font-bold opacity-60 mb-4 ${textClass}`}>{t.reportLabels.guides}</h5>
                <div className="space-y-3">
                  {info.guides.map((guide: string, i: number) => (
                    <div key={i} className="bg-white dark:bg-slate-800/60 p-4 rounded-xl text-xs font-medium leading-relaxed border border-black/5 shadow-sm">
                      {guide}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Toolkit Footer */}
          {info.tools && info.tools.length > 0 && (
            <div className="mt-8 pt-6 border-t border-black/5">
              <h5 className={`text-[10px] uppercase font-bold opacity-60 mb-3 flex items-center gap-2 ${textClass}`}>
                <Wrench className="w-3 h-3" /> {t.reportLabels.tools}
              </h5>
              <div className="flex flex-wrap gap-2">
                {info.tools.map((tool: string, i: number) => (
                  <span key={i} className={`px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg border border-black/10 text-[10px] font-bold uppercase tracking-wide opacity-80 ${textClass}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDomainSection = (domain: any) => (
    <div key={domain.name} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-700 mb-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-50 pb-8 mb-8">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            {t.phases[domain.name] || domain.name}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            {t.interpretations[domain.interpretation] || domain.interpretation}
          </h3>
          <div className="h-2 w-full max-w-xs bg-slate-100 rounded-full overflow-hidden mt-4">
            <div
              className={`h-full transition-all duration-1000 ${domain.score > 60 ? 'bg-rose-500' : domain.score > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${domain.score}%` }}
            />
          </div>
        </div>
        <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white/10">
          {domain.score}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {/* Subscales Column */}
        <div>
          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-6">{t.reportLabels.subscaleBreakdown}</h4>
          <div className="space-y-5">
            {Object.entries(domain.subscales)
              .filter(([name]) => !name.startsWith('_'))
              .map(([name, score]: [string, any]) => (
                <div key={name}>
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    <span className="truncate pr-2">{(t.subscales as any)[name] || name}</span>
                    <span className="shrink-0">{score}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${score > 60 ? 'bg-rose-400' : score > 40 ? 'bg-amber-400' : 'bg-indigo-400'
                        }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Large transparent icon background */}
        <div className="hidden md:flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-50 border-dashed relative overflow-hidden h-[300px]">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <ModuleIcon
              name={domain.name === Phase.AUTISM ? 'autism' : domain.name === Phase.ADHD ? 'adhd' : domain.name === Phase.DYSLEXIA ? 'dyslexia' : domain.name === Phase.DYSPRAXIA ? 'dyspraxia' : 'dyscalculia'}
              className="w-80 h-80 rotate-12"
            />
          </div>
          {domain.score >= 40 && (
            <p className="text-center text-xs text-slate-400 font-medium max-w-[200px] relative z-10">
              {t.reportLabels.insightPrompt}
            </p>
          )}
        </div>
      </div>

      {/* Dynamic Insights Block */}
      <InsightBlock domain={domain} contentKey="" />

    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="mb-12 sm:mb-16 text-center">
        <div className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-6">
          {t.preliminaryResults}
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[1.1]">{t.reportTitle}</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-x leading-relaxed font-medium">
          {t.reportDesc}
        </p>
      </header>

      {/* URGENT CLINICAL ALERT */}
      {report.isClinicalUrgent && (
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="bg-rose-50 border-2 border-rose-200 p-6 sm:p-8 rounded-[2.5rem] flex flex-col sm:flex-row items-center gap-6 shadow-xl shadow-rose-100/50">
            <div className="w-16 h-16 rounded-3xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-200 animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-1">{t.clinicalPath}</p>
              <h3 className="text-xl font-black text-rose-900 mb-2">{t.urgentFlag}</h3>
              <p className="text-rose-700/80 text-sm font-medium leading-relaxed max-w-xl">
                {t.urgentDesc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CORE VISUALIZATION */}
      <section className="mb-16 sm:mb-24 flex flex-col items-center">
        <div className="w-full max-w-xl aspect-square relative bg-white dark:bg-slate-800 p-4 sm:p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex items-center justify-center">
          <div className="relative w-full h-full min-h-[300px]">
            <Radar ref={radarChartRef} data={radarData} options={radarOptions} />
          </div>
          <div className="absolute top-6 left-6 px-4 py-2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
            {t.reportLabels.spikyProfile}
          </div>
        </div>
        {report.flags.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-3xl">
            {report.flags.map((flag, i) => (
              <span key={i} className="px-4 py-2 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-[10px] font-bold uppercase tracking-wide flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                {(t as any)[flag] || flag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* DETAILED INSIGHT SECTIONS */}
      <section className="mb-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-slate-200 flex-1"></div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">{t.specializedProfiles}</h2>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>
        <div className="space-y-12">
          {allDomains.map(renderDomainSection)}
        </div>
      </section>

      {/* FUNCTIONAL IMPACT (Conditional) */}
      {impactEntries.length > 0 && (
        <section className="mb-16 sm:mb-20">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">{t.functionalImpactTitle}</h2>
          <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl overflow-hidden">
            <div className="h-[300px] sm:h-[400px]">
              <Bar ref={barChartRef} data={barData} options={barOptions} />
            </div>
          </div>
        </section>
      )}

      {/* ACTIONS */}
      <div className="flex flex-col items-center justify-center py-12 border-t border-slate-100 dark:border-slate-700 mb-12">
        {onReview && (
          <button
            onClick={onReview}
            className="mb-8 text-[10px] sm:text-xs font-bold text-slate-400 hover:text-indigo-600 dark:text-indigo-400 uppercase tracking-widest transition-colors"
          >
            {locale === 'fr' ? 'Revoir et modifier les réponses' : 'Review & Edit Answers'}
          </button>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
          <button
            onClick={generateDetailedPdf}
            disabled={isGeneratingPdf}
            className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl sm:rounded-[2rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50"
          >
            {isGeneratingPdf ? '...' : t.downloadPdf}
          </button>
          <button
            onClick={onReset}
            className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl sm:rounded-[2rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-slate-50 dark:bg-slate-900 transition-all shadow-sm"
          >
            {t.retake}
          </button>
        </div>
      </div>

      {/* MEDICAL SEARCH SECTION */}
      <section className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border border-indigo-100 dark:border-indigo-900">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-4">
              {locale === 'en' ? 'Need Professional Support?' : 'Besoin d\'aide professionnelle?'}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
              {locale === 'en' ? 'Find Medical Assistance' : 'Trouver une assistance médicale'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {locale === 'en'
                ? 'Enter your location to generate a personalized search query for specialists in your area. The query will be copied to your clipboard.'
                : 'Entrez votre localisation pour générer une requête de recherche personnalisée pour des spécialistes dans votre région. La requête sera copiée dans votre presse-papiers.'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  {locale === 'en' ? 'City' : 'Ville'}
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={locale === 'en' ? 'e.g., London' : 'ex: Paris'}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  {locale === 'en' ? 'Country' : 'Pays'}
                </label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={locale === 'en' ? 'e.g., United Kingdom' : 'ex: France'}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={generateMedicalSearchQuery}
              className="w-full px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  {locale === 'en' ? 'Copied to Clipboard!' : 'Copié dans le presse-papiers!'}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  {locale === 'en' ? 'Generate & Copy Search Query' : 'Générer et copier la requête'}
                </>
              )}
            </button>

            <div className="pt-4 border-t border-indigo-100 dark:border-indigo-900">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                {locale === 'en'
                  ? 'The search query will include relevant condition keywords based on your profile and your location to help you find specialized healthcare professionals.'
                  : 'La requête de recherche inclura les mots-clés pertinents basés sur votre profil et votre localisation pour vous aider à trouver des professionnels de santé spécialisés.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Report;
