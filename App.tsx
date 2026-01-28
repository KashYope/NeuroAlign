
import React, { useState, useEffect, useMemo } from 'react';
import { Phase, UserAnswer, ScreeningReport, Locale } from './types';
import { QUESTIONS } from './questions';
import { translations } from './i18n';
import LikertScale from './components/LikertScale';
import Report from './components/Report';
import { calculateReport } from './utils/scoring';
import { saveProgress, loadProgress, clearProgress } from './utils/persistence';

// Simple FAQ Component for the landing page
const FAQAccordion: React.FC<{ items: { q: string, a: string }[], title: string }> = ({ items, title }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-4xl mt-32 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 text-center">{title}</h2>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden transition-all duration-300">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-8 py-6 text-left flex justify-between items-center group"
            >
              <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors pr-4">{item.q}</span>
              <svg 
                className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-indigo-500' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-[300px] opacity-100 pb-8 px-8' : 'max-h-0 opacity-0'}`}>
              <p className="text-slate-500 leading-relaxed text-sm">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>('en');
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = Intro
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [report, setReport] = useState<ScreeningReport | null>(null);
  const [isDebug, setIsDebug] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const t = translations[locale];

  // Load persistence on mount
  useEffect(() => {
    try {
      const saved = loadProgress();
      if (saved) {
        if (saved.answers) setAnswers(saved.answers);
        if (saved.locale) setLocale(saved.locale);
      }
    } catch (e) {
      console.error("Critical: Progress loading failed", e);
    }
  }, []);

  // Save persistence when answers or index change
  useEffect(() => {
    if (currentIndex >= 0 && !report) {
      saveProgress({ index: currentIndex, answers, locale });
    }
  }, [currentIndex, answers, report, locale]);

  const liveReport = useMemo(() => {
    if (answers.length === 0) return null;
    try {
      return calculateReport(answers);
    } catch (e) {
      console.error("Live scoring error:", e);
      return null;
    }
  }, [answers]);

  const handleAnswer = (score: number) => {
    if (isAdvancing) return;
    
    setIsAdvancing(true);
    const questionId = QUESTIONS[currentIndex].id;
    const newAnswers = [...answers.filter(a => a.questionId !== questionId), { questionId, score }];
    setAnswers(newAnswers);
    
    // Auto-advance with visual feedback delay
    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsAdvancing(false);
      } else {
        finishAssessment(newAnswers);
        setIsAdvancing(false);
      }
    }, 450);
  };

  const finishAssessment = (finalAnswers: UserAnswer[]) => {
    try {
      const calculatedReport = calculateReport(finalAnswers);
      setReport(calculatedReport);
      clearProgress();
    } catch (e) {
      alert(locale === 'en' ? "An error occurred during scoring. Please try again." : "Une erreur est survenue lors du calcul du score. Veuillez réessayer.");
      console.error(e);
    }
  };

  const startNewAssessment = () => {
    if (answers.length > 0) {
      const msg = locale === 'en' 
        ? "This will clear all your progress. Are you sure you want to start over?" 
        : "Cela effacera toute votre progression. Êtes-vous sûr de vouloir recommencer ?";
      if (confirm(msg)) {
        clearProgress();
        window.location.reload();
      }
    } else {
      setCurrentIndex(0);
    }
  };

  const resumeAssessment = () => {
    const saved = loadProgress();
    if (saved && saved.index !== undefined) {
      setCurrentIndex(saved.index);
    } else {
      setCurrentIndex(0);
    }
  };

  const forceReset = () => {
    clearProgress();
    window.location.reload();
  };

  const handleSaveAndExit = () => {
    saveProgress({ index: currentIndex, answers, locale });
    setCurrentIndex(-1);
  };

  const generateRandomAnswers = () => {
    const randoms = QUESTIONS.map(q => ({
      questionId: q.id,
      score: Math.floor(Math.random() * 5) + 1
    }));
    setAnswers(randoms);
  };

  const forceReport = () => {
    const targetAnswers = answers.length > 0 ? answers : QUESTIONS.map(q => ({
      questionId: q.id,
      score: Math.floor(Math.random() * 5) + 1
    }));
    finishAssessment(targetAnswers);
  };

  const LanguageSwitcher = () => (
    <nav aria-label="Language selection" className="fixed top-6 right-24 flex bg-white/70 backdrop-blur rounded-full p-1 border border-slate-200 z-50 shadow-sm">
      <button 
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`px-4 py-1.5 rounded-full text-xs font-black transition-all outline-none ${locale === 'en' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
      >
        EN
      </button>
      <button 
        onClick={() => setLocale('fr')}
        aria-pressed={locale === 'fr'}
        className={`px-4 py-1.5 rounded-full text-xs font-black transition-all outline-none ${locale === 'fr' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
      >
        FR
      </button>
    </nav>
  );

  const DebugToggle = () => (
    <div className="fixed top-6 right-6 z-50">
      <button 
        onClick={() => setIsDebug(!isDebug)}
        aria-label="Toggle clinical debug mode"
        className={`p-2.5 rounded-full border transition-all shadow-sm ${isDebug ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-white/70 border-slate-200 text-slate-400 hover:text-slate-800'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
      </button>
    </div>
  );

  if (report) {
    return (
      <main className="min-h-screen bg-slate-50">
        <LanguageSwitcher />
        <DebugToggle />
        <Report report={report} answers={answers} onReset={forceReset} locale={locale} />
      </main>
    );
  }

  if (currentIndex === -1) {
    const hasProgress = answers.length > 0;
    const domains = [
      { id: 'autism', title: t.phases["Autism Spectrum"], desc: t.domainIntros.autism, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'text-indigo-600 bg-indigo-50' },
      { id: 'adhd', title: t.phases.ADHD, desc: t.domainIntros.adhd, icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'text-amber-600 bg-amber-50' },
      { id: 'dyslexia', title: t.phases.Dyslexia, desc: t.domainIntros.dyslexia, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'text-emerald-600 bg-emerald-50' },
      { id: 'dyscalculia', title: t.phases.Dyscalculia, desc: t.domainIntros.dyscalculia, icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14', color: 'text-rose-600 bg-rose-50' },
      { id: 'dyspraxia', title: t.phases.Dyspraxia, desc: t.domainIntros.dyspraxia, icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0V12m-3-1.5a3 3 0 00-6 0V14a3 3 0 006 0v-2.5m3 1.5V9a1.5 1.5 0 113 0v4.5m-3-4.5a3 3 0 00-6 0V14a3 3 0 006 0V9.5m3 1.5V10.5a1.5 1.5 0 113 0v4m-3-4a3 3 0 00-6 0V14a3 3 0 006 0v-3.5m3 1.5V12a1.5 1.5 0 113 0v2.5m-3-2.5a3 3 0 00-6 0V14a3 3 0 006 0v-1.5', color: 'text-sky-600 bg-sky-50' },
      { id: 'language', title: t.phases["Language Disorder"], desc: t.domainIntros.language, icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', color: 'text-purple-600 bg-purple-50' },
      { id: 'wellbeing', title: t.phases.Comorbidities, desc: t.domainIntros.wellbeing, icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', color: 'text-pink-600 bg-pink-50' }
    ];

    return (
      <main className="min-h-screen py-20 px-6 bg-slate-50 flex flex-col items-center">
        <LanguageSwitcher />
        <DebugToggle />
        
        <div className="max-w-4xl w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center mb-10 shadow-xl shadow-indigo-100 animate-in zoom-in duration-700">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          </div>
          
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight text-center">{t.introTitle}</h1>
          <p className="text-xl text-slate-600 max-w-2xl text-center leading-relaxed font-medium mb-16">
            {t.introDesc}
          </p>

          <section className="w-full mb-20">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 text-center">{t.domainsTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {domains.map((d) => (
                <div key={d.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex gap-6 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${d.color}`}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d.icon} /></svg>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 mb-1">{d.title}</h3>
                    <p className="text-sm text-slate-500 leading-snug">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="w-full max-w-sm flex flex-col gap-4">
            {hasProgress ? (
              <>
                <button 
                  onClick={resumeAssessment}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] outline-none"
                >
                  {t.continueBtn}
                </button>
                <button 
                  onClick={startNewAssessment}
                  className="w-full py-4 text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-slate-800 transition-colors"
                >
                  {t.startBtn}
                </button>
              </>
            ) : (
              <button 
                onClick={() => setCurrentIndex(0)}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] outline-none"
              >
                {t.startBtn}
              </button>
            )}
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-6 text-center leading-relaxed">
              {t.saveNotice}
            </p>
          </div>

          <FAQAccordion items={t.faq} title={t.faqTitle} />
        </div>
      </main>
    );
  }

  const currentQ = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center p-6 sm:p-12 pb-32">
      <LanguageSwitcher />
      <DebugToggle />
      
      {/* Real-time Debug Scorer Overlay */}
      {isDebug && liveReport && (
        <aside className="fixed bottom-6 left-6 right-6 bg-slate-900/95 text-white p-6 rounded-[2.5rem] shadow-2xl z-50 backdrop-blur-md border border-slate-800 animate-in slide-in-from-bottom-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Clinical Data Stream</span>
              <div className="flex gap-2">
                <button onClick={generateRandomAnswers} className="px-2 py-1 bg-slate-800 rounded text-[8px] font-bold uppercase hover:bg-slate-700">Randomize</button>
                <button onClick={forceReport} className="px-2 py-1 bg-indigo-600 rounded text-[8px] font-bold uppercase hover:bg-indigo-500">Finish</button>
              </div>
            </div>
            <button onClick={() => setIsDebug(false)} className="text-slate-500 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {liveReport.domainScores.map(d => (
              <div key={d.name} className="bg-slate-800/50 p-3 rounded-2xl">
                <p className="text-[7px] font-black uppercase tracking-widest text-slate-500 mb-1 truncate">{(t.phases as any)[d.name] || d.name}</p>
                <p className="text-lg font-black text-indigo-400">{d.score}%</p>
              </div>
            ))}
          </div>
        </aside>
      )}

      <nav className="w-full max-w-4xl flex items-center justify-between mb-12">
        <button onClick={() => setCurrentIndex(-1)} className="p-2 text-slate-400 hover:text-slate-800 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
          {(t.phases as any)[currentQ.phase]}
        </span>
        <div className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full tracking-tighter">
          {currentIndex + 1} / {QUESTIONS.length}
        </div>
      </nav>

      <div className="w-full max-w-4xl h-2 bg-slate-200 rounded-full mb-16 overflow-hidden">
        <div className="h-full bg-indigo-500 transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
      </div>

      <article className={`w-full max-w-4xl bg-white p-10 sm:p-24 rounded-[4rem] shadow-xl shadow-slate-200/50 transition-all duration-500 ${isAdvancing ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'}`}>
        <span className="inline-block px-4 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
          {(t.subscales as any)[currentQ.subscale] || currentQ.subscale}
        </span>
        
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-[1.2] mb-20 tracking-tight min-h-[6rem]">
          {currentQ.text[locale]}
        </h2>
        
        <LikertScale 
          key={currentQ.id}
          value={answers.find(a => a.questionId === currentQ.id)?.score || 0}
          onChange={handleAnswer}
          locale={locale}
        />

        <div className="mt-20 flex justify-between items-center">
          <button 
            disabled={currentIndex === 0 || isAdvancing}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 disabled:opacity-0 transition-all"
          >
            ← {t.back}
          </button>
          <button 
            onClick={handleSaveAndExit}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            {t.saveAndExit}
          </button>
        </div>
      </article>

      <footer className="mt-auto py-12 text-center flex flex-col items-center gap-2">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">{t.footer}</p>
        <p className="text-xs font-medium text-slate-400">Vibe coded by Kash 🦄 - 2026 - Sharing is caring ❤️</p>
      </footer>
    </main>
  );
};

export default App;
