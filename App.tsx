import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Phase, UserAnswer, ScreeningReport, DomainScore, Translation, Locale } from './types';
import { QUESTIONS } from './questions';
import { translations } from './i18n';
import LikertScale from './components/LikertScale';
import Report from './components/Report';
import MethodsPage from './components/MethodsPage';
import ReviewPage from './components/ReviewPage';
import QRScanner from './components/QRScanner';
import { calculateReport, getScaleMinMax } from './utils/scoring';
import { saveProgress, loadProgress, clearProgress } from './utils/persistence';
import { decodeAnswers } from './utils/sharing';
import { shuffle } from './utils/random';
import ModuleIcon from './components/ModuleIcon';
import BreakMoment from './components/BreakMoment';
import DopamineRewards from './components/DopamineRewards';
import AssessmentIntro from './components/AssessmentIntro';
import ModuleSelection from './components/ModuleSelection';
import { ChevronDown, Activity, ArrowRight, Mail, Code, Sun, Moon, X, ChevronLeft, BrainCircuit, Sparkles, Camera } from 'lucide-react';
import EffectCanvas, { EffectCanvasHandle } from './components/EffectCanvas';
import { EffectType } from './types';


const FAQAccordion: React.FC<{ items: { q: string, a: string }[], title: string }> = ({ items, title }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="w-full max-w-4xl mt-24 sm:mt-32 mb-16 sm:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 text-center">{title}</h2>
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden transition-all duration-300">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex justify-between items-center group focus:outline-none focus:bg-slate-50"
            >
              <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors pr-4">{item.q}</span>
              <ChevronDown className={`w-4 h-4 sm:w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180 text-indigo-500' : ''}`} />
            </button>
            <div className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100 pb-6 sm:pb-8 px-6 sm:px-8' : 'max-h-0 opacity-0 overflow-hidden'}`}><p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{item.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
};

const DomainsOverview: React.FC<{ t: Translation }> = ({ t }) => {
  const domains = ['adhd', 'autism', 'dyslexia', 'dyspraxia', 'dyscalculia'];

  return (
    <div className="w-full max-w-5xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-5 delay-150 px-4">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">{t.domainsTitle}</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {domains.map((key) => {
          const title = t.methodology.modules[key]?.title.replace(/Module\s*|\s*Module/gi, '').trim();
          return (
            <div key={key} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center h-full">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shrink-0">
                <ModuleIcon name={key} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-2">{title}</span>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{t.domainIntros[key]}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};


const MethodologySection: React.FC<{ t: Translation; onShowMethods: () => void }> = ({ t, onShowMethods }) => (
  <section className="w-full max-w-5xl mt-32 mb-24 sm:mb-32 animate-in fade-in slide-in-from-bottom-8 delay-300 duration-1000 px-4">
    <div className="text-center mb-16">
      <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-6">
        {t.methodology.title}
      </div>
      <p className="text-xl sm:text-2xl text-slate-800 dark:text-slate-200 max-w-3xl mx-auto leading-relaxed font-bold tracking-tight">
        {t.methodology.description}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      {/* Spiky Profile Card */}
      <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 md:col-span-1 flex flex-col">
        <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
          <Activity className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{t.methodology.spikyProfileTitle}</h3>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-8 flex-1">
          {t.methodology.spikyProfileDesc}
        </p>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 flex flex-col items-center">
          <div className="w-full max-w-[200px] aspect-square relative mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500" fill="none" stroke="currentColor" strokeWidth="1.5">
              {/* Grid */}
              <circle cx="50" cy="50" r="20" strokeOpacity="0.2" />
              <circle cx="50" cy="50" r="35" strokeOpacity="0.2" />
              <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" strokeOpacity="0.2" />

              {/* Spiky Shape */}
              <path d="M50 15 L70 30 L85 50 L70 75 L50 85 L25 65 L20 40 L35 25 Z"
                fill="currentColor" fillOpacity="0.2" strokeWidth="2.5" className="drop-shadow-sm" />
              {/* Points */}
              <circle cx="50" cy="15" r="2.5" fill="currentColor" />
              <circle cx="70" cy="30" r="2.5" fill="currentColor" />
              <circle cx="85" cy="50" r="2.5" fill="currentColor" />
              <circle cx="70" cy="75" r="2.5" fill="currentColor" />
              <circle cx="50" cy="85" r="2.5" fill="currentColor" />
              <circle cx="25" cy="65" r="2.5" fill="currentColor" />
              <circle cx="20" cy="40" r="2.5" fill="currentColor" />
              <circle cx="35" cy="25" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <p className="text-[9px] text-center font-black uppercase tracking-widest text-slate-400">Visualization Concept</p>
        </div>
      </div>

      {/* Modules Card */}
      <div className="bg-indigo-600 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200 dark:shadow-none text-white md:col-span-1">
        <h3 className="text-2xl font-black mb-8 px-2">{t.methodology.sourcesTitle}</h3>
        <div className="space-y-6">
          {Object.entries(t.methodology.modules).map(([key, mod]: [string, any]) => (
            <div key={key} className="flex items-start gap-5 group">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/50 flex items-center justify-center shrink-0 border border-indigo-400/30 group-hover:bg-white group-hover:text-indigo-600 transition-colors duration-300">
                <ModuleIcon name={key} className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-1">{mod.source}</p>
                <p className="text-lg font-bold leading-tight">{mod.title}</p>
                <p className="text-xs text-indigo-200/80 mt-1 leading-relaxed">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 delay-500 duration-1000">
      <button
        onClick={onShowMethods}
        className="group relative px-8 py-4 bg-white text-indigo-600 rounded-2xl border-2 border-indigo-100 font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-lg shadow-indigo-100/50 dark:shadow-none hover:shadow-indigo-200 dark:hover:shadow-none hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center gap-3 mx-auto overflow-hidden"
      >
        <span className="relative z-10">{t.methodology.learnBtn}</span>
        <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </section >
);
const FeedbackBanner: React.FC<{ locale: Locale }> = ({ locale }) => {
  const handleFeedbackClick = () => {
    const user = 'cestmoikash+neuroalign';
    const domain = 'gmail.com';
    const subject = encodeURIComponent('NeuroAlign Beta Feedback');
    window.location.href = `mailto:${user}@${domain}?subject=${subject}`;
  };

  return (
    <div className="fixed top-0 left-0 z-[101]">
      <button
        onClick={handleFeedbackClick}
        className="bg-indigo-600 text-white px-4 py-2 rounded-br-2xl shadow-lg dark:shadow-none hover:bg-indigo-700 transition-all flex items-center gap-2 group"
        aria-label={locale === 'fr' ? 'Envoyer des commentaires' : 'Send feedback'}
      >
        <Mail className="w-4 h-4" />
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
          {locale === 'fr' ? 'Avis' : 'Feedback'}
        </span>
      </button>
    </div>
  );
};

const LanguageSwitcher: React.FC<{ locale: Locale, setLocale: (l: Locale) => void, isDark: boolean, toggleTheme: () => void }> = ({ locale, setLocale, isDark, toggleTheme }) => (
  <nav aria-label="Language selection" className="fixed top-4 sm:top-6 right-4 sm:right-6 flex bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full p-1 border border-slate-200 dark:border-slate-700 z-[101] shadow-lg shadow-slate-200/50 dark:shadow-none scale-90 sm:scale-100 origin-right transition-colors">
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mr-1"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
    <button onClick={() => setLocale('en')} className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${locale === 'en' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}>EN</button>
    <button onClick={() => setLocale('fr')} className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${locale === 'fr' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}>FR</button>
  </nav>
);

const DebugToggle: React.FC<{ isDebug: boolean, setIsDebug: (d: boolean) => void }> = ({ isDebug, setIsDebug }) => (
  <div className="fixed bottom-4 left-4 z-[101] scale-90 sm:scale-100 origin-bottom-left opacity-50 hover:opacity-100 transition-opacity">
    <button onClick={() => setIsDebug(!isDebug)} aria-label="Toggle debug view" className={`p-2 sm:p-2.5 rounded-full border transition-all shadow-lg ${isDebug ? 'bg-red-600 border-red-600 text-white shadow-red-200' : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 shadow-slate-200/50 dark:shadow-none'}`}>
      <Code className="w-5 h-5" />
    </button>
  </div>
);

const DebugOverlay: React.FC<{
  isDebug: boolean,
  isDopamine: boolean,
  setDopamine: (v: boolean) => void,
  liveReport: any,
  generateRandom: () => void,
  forceFinish: () => void,
  close: () => void,
  t: Translation
}> = ({ isDebug, isDopamine, setDopamine, liveReport, generateRandom, forceFinish, close, t }) => {
  if (!isDebug) return null;
  return (
    <aside className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-slate-900/95 text-white p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl z-[110] backdrop-blur-md border border-slate-800 animate-in slide-in-from-bottom-6 max-h-[50vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-5 sticky top-0 bg-slate-900/40 py-1">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Stream Log</span>
          <div className="flex gap-2">
            <button onClick={generateRandom} className="px-2 py-1 bg-slate-800 rounded text-[7px] font-black uppercase hover:bg-slate-700">Rand</button>
            <button onClick={forceFinish} className="px-2 py-1 bg-indigo-600 rounded text-[7px] font-black uppercase hover:bg-indigo-500">End</button>
            <button
              onClick={() => setDopamine(!isDopamine)}
              className={`px-2 py-1 ${isDopamine ? 'bg-yellow-500 text-slate-900' : 'bg-slate-700'} rounded text-[7px] font-black uppercase hover:bg-yellow-400 flex items-center gap-1 transition-all`}
            >
              <Sparkles size={8} /> ADHD
            </button>
            <button onClick={() => {
              (window as any).triggerChaos();
            }} className="px-2 py-1 bg-rose-600 rounded text-[7px] font-black uppercase hover:bg-rose-500 animate-pulse">Chaos</button>
          </div>
        </div>
        <button onClick={close} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-4">
        {liveReport ? liveReport.domainScores.map((d: any) => (
          <div key={d.name} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <p className="text-[7px] font-black uppercase tracking-widest text-slate-500 mb-1 truncate">{t.phases[d.name] || d.name}</p>
            <p className="text-base sm:text-lg font-black text-indigo-400">{d.score}%</p>
          </div>
        )) : <div className="col-span-full py-4 text-center text-slate-500 text-[9px] font-black uppercase tracking-widest">Awaiting context...</div>}
      </div>

      {liveReport && liveReport.flags.length > 0 && (
        <div className="pt-4 border-t border-slate-800">
          <p className="text-[8px] font-black uppercase tracking-widest text-rose-400 mb-2">Active Flags</p>
          <div className="flex flex-wrap gap-2">
            {liveReport.flags.map((flag: string) => (
              <span key={flag} className="px-2 py-1 bg-rose-500/10 border border-rose-500/30 rounded text-[8px] font-bold text-rose-300 uppercase tracking-wide">
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const [locale, setLocale] = useState<Locale>('en');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [report, setReport] = useState<ScreeningReport | null>(null);
  const [hasCompletedReport, setHasCompletedReport] = useState(false);
  const [isDebug, setIsDebug] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [showMethods, setShowMethods] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showBreak, setShowBreak] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isDopamineMode, setIsDopamineMode] = useState(false);
  const [seed, setSeed] = useState<number>(Date.now());
  const [activeMouseEffect, setActiveMouseEffect] = useState<EffectType | null>(null);
  const [showIntro, setShowIntro] = useState(false);
  const [assessmentMode, setAssessmentMode] = useState<'marathon' | 'modular' | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const effectCanvasRef = useRef<EffectCanvasHandle>(null);

  const ALL_EFFECTS: EffectType[] = [
    'hearts', 'sparkles', 'confetti', 'starburst', 'bubbles',
    'firework', 'pixels', 'electric', 'snow', 'fire',
    'plasma', 'geometric', 'shockwave', 'emoji', 'matrix',
    'ghost', 'rings', 'leaves', 'orbs', 'ai_magic', 'ripple'
  ];

  const handleUnicornClick = () => {
    if (!activeMouseEffect) {
      setActiveMouseEffect('hearts');
    } else {
      const currentIndex = ALL_EFFECTS.indexOf(activeMouseEffect);
      const nextIndex = (currentIndex + 1) % ALL_EFFECTS.length;
      setActiveMouseEffect(ALL_EFFECTS[nextIndex]);
    }
  };

  useEffect(() => {
    if (!activeMouseEffect) return;

    const handleMouseDown = (e: MouseEvent) => {
      effectCanvasRef.current?.spawnParticles(e.clientX, e.clientY);
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [activeMouseEffect]);

  const t: Translation = translations[locale];

  const isNavigatingViaHistory = useRef(false);
  const isFirstRender = useRef(true);

  // Memoize shuffled questions based on seed
  const shuffledQuestions = useMemo(() => shuffle(QUESTIONS, seed), [seed]);

  // Active questions based on mode and phase
  const activeQuestions = useMemo(() => {
    if (assessmentMode === 'modular' && selectedPhase) {
      return shuffledQuestions.filter(q => q.phase === selectedPhase);
    }
    return shuffledQuestions;
  }, [shuffledQuestions, assessmentMode, selectedPhase]);

  useEffect(() => {
    if (isFirstRender.current) {
      if (!window.history.state) {
        window.history.replaceState({ type: 'home' }, '');
      }
      isFirstRender.current = false;
    }

    const handlePopState = (event: PopStateEvent) => {
      isNavigatingViaHistory.current = true;
      const state = event.state;

      if (report) {
        if (state?.type === 'review') {
          setShowReview(true);
        } else {
          setShowReview(false);
          if (state?.type !== 'report') {
            window.history.pushState({ type: 'report' }, '');
          }
        }
        isNavigatingViaHistory.current = false;
        return;
      }

      if (!state || state.type === 'home') {
        setShowMethods(false);
        setShowIntro(false);
        setAssessmentMode(null);
        setSelectedPhase(null);
        setCurrentIndex(-1);
      } else if (state.type === 'methods') {
        setShowMethods(true);
      } else if (state.type === 'intro') {
        setShowIntro(true);
        setAssessmentMode(null);
        setSelectedPhase(null);
        setCurrentIndex(-1);
      } else if (state.type === 'module_selection') {
        setShowIntro(false);
        setAssessmentMode('modular');
        setSelectedPhase(null);
        setCurrentIndex(-1);
      } else if (state.type === 'question') {
        setShowMethods(false);
        setShowIntro(false);
        setCurrentIndex(state.index);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [report]);

  useEffect(() => {
    if (isNavigatingViaHistory.current) return;
    if (showMethods) {
      window.history.pushState({ type: 'methods' }, '');
    } else if (showIntro) {
      window.history.pushState({ type: 'intro' }, '');
    }
  }, [showMethods, showIntro]);

  useEffect(() => {
    if (isNavigatingViaHistory.current) return;
    if (assessmentMode === 'modular' && !selectedPhase && !report) {
      window.history.pushState({ type: 'module_selection' }, '');
    }
  }, [assessmentMode, selectedPhase, report]);

  useEffect(() => {
    if (isNavigatingViaHistory.current) return;
    if (showReview) {
      window.history.pushState({ type: 'review' }, '');
    }
  }, [showReview]);

  useEffect(() => {
    if (isNavigatingViaHistory.current) return;
    if (currentIndex >= 0) {
      window.history.pushState({ type: 'question', index: currentIndex }, '');
    } else if (currentIndex === -1 && !showMethods && !report && !showReview && !isFirstRender.current) {
      window.history.pushState({ type: 'home' }, '');
    }
  }, [currentIndex, showMethods, report, showReview]);

  useEffect(() => {
    if (report) {
      window.history.pushState({ type: 'report' }, '');
    }
  }, [report]);

  useEffect(() => {
    if (isNavigatingViaHistory.current) {
      isNavigatingViaHistory.current = false;
    }
  });

  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      if (saved.answers) setAnswers(saved.answers);
      if (saved.locale) setLocale(saved.locale);
      if (saved.seed) setSeed(saved.seed);
      if (saved.isComplete) setHasCompletedReport(true);
    }
  }, []);

  useEffect(() => {
    if (currentIndex >= 0 && !report) {
      saveProgress({ index: currentIndex, answers, locale, showBreak, seed });
    }
  }, [currentIndex, answers, report, locale, showBreak, seed]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showMethods, report, currentIndex, showReview]);

  const liveReport = useMemo(() => {
    if (answers.length === 0) return null;
    try { return calculateReport(answers); } catch (e) { return null; }
  }, [answers]);

  const handleAnswer = (score: number) => {
    if (isAdvancing) return;
    setIsAdvancing(true);
    const questionId = activeQuestions[currentIndex].id;
    const newAnswers = [...answers.filter(a => a.questionId !== questionId), { questionId, score }];
    setAnswers(newAnswers);
    setTimeout(() => {
      const nextIndex = currentIndex + 1;

      if (nextIndex < activeQuestions.length) {
        // Break every 25 questions in marathon mode
        if (assessmentMode === 'marathon' && (currentIndex + 1) % 25 === 0) {
          setShowBreak(true);
        } else {
          setCurrentIndex(nextIndex);
        }
        setIsAdvancing(false);
      } else {
        if (assessmentMode === 'modular') {
          // In modular mode, return to module selection
          setCurrentIndex(-1);
          setSelectedPhase(null);
          saveProgress({ answers: newAnswers, locale, seed, isComplete: false });
        } else {
          finishAssessment(newAnswers);
        }
        setIsAdvancing(false);
      }
    }, 450);
  };

  const finishAssessment = (finalAnswers: UserAnswer[]) => {
    try {
      const calculatedReport = calculateReport(finalAnswers);
      setReport(calculatedReport);
      saveProgress({ answers: finalAnswers, locale, seed, isComplete: true });
    } catch (e) {
      alert(t.errors.scoring);
    }
  };

  const forceReport = () => {
    const targetAnswers = answers.length > 0 ? answers : shuffledQuestions.map(q => {
      const { min, max } = getScaleMinMax(q.scale);
      return { questionId: q.id, score: Math.floor(Math.random() * (max - min + 1)) + min };
    });
    finishAssessment(targetAnswers);
  };

  const generateRandom = () => {
    setAnswers(shuffledQuestions.map(q => {
      const { min, max } = getScaleMinMax(q.scale);
      return { questionId: q.id, score: Math.floor(Math.random() * (max - min + 1)) + min };
    }));
  };

  // Chaos Trigger for debugging
  useEffect(() => {
    (window as any).triggerChaos = () => {
      // Generate high intensity answers (Max possible score per question)
      const chaosAnswers = QUESTIONS.map(q => {
        const { max } = getScaleMinMax(q.scale);
        return { questionId: q.id, score: max };
      });
      setAnswers(chaosAnswers);

      // Force a report with every possible flag and clinical urgency
      const chaosReport = calculateReport(chaosAnswers);
      chaosReport.isClinicalUrgent = true;
      chaosReport.flags = ['coOccurrence', 'maskingFlag', 'headInjuryFlag', 'depressionFlag'];

      // Add full functional impact
      chaosReport.functionalImpact = {
        "7.1": 5, "7.2": 4, "7.3": 5, "7.4": 3, "7.5": 5
      };

      setReport(chaosReport);
      setShowDisclaimer(true);
      alert("🚨 CHAOS MODE ACTIVATED: All visual elements triggered for debugging.");
    };
  }, [t]);

  // Fixed restart logic to avoid window.location.reload errors and properly reset component state
  const restart = () => {
    clearProgress();
    setReport(null);
    setAnswers([]);
    setHasCompletedReport(false);
    setCurrentIndex(-1);
    setShowDisclaimer(false);
    setDisclaimerChecked(false);
    setShowIntro(false);
    setAssessmentMode(null);
    setSelectedPhase(null);
    setSeed(Date.now()); // Generate new seed for next attempt
  };

  const handleStartRequest = () => {
    const saved = loadProgress();
    if (saved && saved.answers && saved.answers.length > 0) {
      setCurrentIndex(saved.index ?? 0);
      setShowBreak(saved.showBreak ?? false);
    } else {
      setShowIntro(true); // Show the new introductory page
    }
  };

  const handleChoice = (mode: 'marathon' | 'modular') => {
    setAssessmentMode(mode);
    setShowIntro(false);
    if (mode === 'marathon') {
      setShowDisclaimer(true);
    }
    // For modular, it proceeds to ModuleSelection via the state change
  };

  const handleModuleSelect = (phase: Phase) => {
    setSelectedPhase(phase);
    setCurrentIndex(0);
  };

  const handleViewResults = () => {
    try {
      const calculatedReport = calculateReport(answers);
      setReport(calculatedReport);
    } catch (e) {
      alert(t.errors.scoring);
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    try {
      const restoredAnswers = decodeAnswers(decodedText);
      setAnswers(restoredAnswers);
      // Ensure seed is set to something valid, or just keep current
      // The report calculation doesn't depend on seed, only randomization of questions.
      // But we are restoring answers which are ID-based, so randomization doesn't matter for the report.

      const restoredReport = calculateReport(restoredAnswers);
      setReport(restoredReport);
      setHasCompletedReport(true);
      saveProgress({ answers: restoredAnswers, locale, seed, isComplete: true });
      setShowScanner(false);
      // Force report view
      window.history.pushState({ type: 'report' }, '');
    } catch (e) {
      console.error("Scan Error", e);
      alert(locale === 'fr' ? 'Erreur: QR code invalide ou version incompatible.' : 'Error: Invalid QR code or version mismatch.');
      setShowScanner(false);
    }
  };

  const handleReviewSave = (newAnswers: UserAnswer[]) => {
    setAnswers(newAnswers);
    const newReport = calculateReport(newAnswers);
    setReport(newReport);
    saveProgress({ answers: newAnswers, locale, seed, isComplete: true });
    setShowReview(false);
    // Explicitly push report state to ensure we are back in report mode
    if (!isNavigatingViaHistory.current) {
      window.history.pushState({ type: 'report' }, '');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col antialiased overflow-x-hidden">
      {activeMouseEffect && (
        <EffectCanvas
          ref={effectCanvasRef}
          activeEffect={activeMouseEffect}
          aiConfig={null}
        />
      )}
      {!showMethods && <FeedbackBanner locale={locale} />}
      <LanguageSwitcher locale={locale} setLocale={setLocale} isDark={isDark} toggleTheme={toggleTheme} />
      <DebugToggle isDebug={isDebug} setIsDebug={setIsDebug} />
      <DebugOverlay
        isDebug={isDebug}
        isDopamine={isDopamineMode}
        setDopamine={setIsDopamineMode}
        liveReport={liveReport}
        generateRandom={generateRandom}
        forceFinish={forceReport}
        close={() => setIsDebug(false)}
        t={t}
      />
      <DopamineRewards active={isDopamineMode} />

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setShowScanner(false)}
          locale={locale}
        />
      )}

      {showDisclaimer && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 max-w-lg w-full p-8 sm:p-10 rounded-[2.5rem] shadow-2xl dark:shadow-none animate-in zoom-in slide-in-from-bottom-8 duration-500 border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{t.disclaimerTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8 font-medium">
              {t.disclaimerText}
            </p>
            <label className="flex items-start gap-4 mb-8 cursor-pointer group">
              <div className="relative flex items-center mt-1">
                <input
                  type="checkbox"
                  checked={disclaimerChecked}
                  onChange={(e) => setDisclaimerChecked(e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none"
                />
                <svg className="absolute w-4 h-4 text-white p-0.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                {t.disclaimerCheck}
              </span>
            </label>
            <div className="flex flex-col gap-3">
              <button
                disabled={!disclaimerChecked}
                onClick={() => { setShowDisclaimer(false); setCurrentIndex(0); }}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100 active:scale-95"
              >
                {t.disclaimerBtn}
              </button>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="w-full py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600"
              >
                {t.back}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {showMethods ? (
          <MethodsPage onBack={() => window.history.back()} onStart={() => { setShowMethods(false); handleStartRequest(); }} t={t} locale={locale} />
        ) : showReview ? (
          <ReviewPage answers={answers} onSave={handleReviewSave} onBack={() => window.history.back()} locale={locale} />
        ) : report ? (
          <Report report={report} answers={answers} onReset={restart} locale={locale} onReview={() => setShowReview(true)} />
        ) : showIntro ? (
          <AssessmentIntro t={t} onChoice={handleChoice} onBack={() => setShowIntro(false)} />
        ) : assessmentMode === 'modular' && !selectedPhase ? (
          <ModuleSelection t={t} answers={answers} onSelect={handleModuleSelect} onBack={() => { setAssessmentMode(null); setShowIntro(true); }} />
        ) : currentIndex === -1 ? (
          <main className="flex-1 py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center">
            <div className="max-w-4xl w-full flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-600 text-white rounded-2xl sm:rounded-3xl flex items-center justify-center mb-8 sm:mb-10 shadow-xl shadow-indigo-100 dark:shadow-none animate-in zoom-in duration-700">
                <BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight text-center">{t.introTitle}</h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl text-center leading-relaxed font-medium mb-8 sm:mb-10 px-2">{t.introDesc}</p>

              <DomainsOverview t={t} />

              <button onClick={hasCompletedReport ? handleViewResults : handleStartRequest} className="w-full max-w-sm py-4 sm:py-5 bg-indigo-600 text-white rounded-2xl font-black text-base sm:text-lg uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-[0.98] outline-none">{hasCompletedReport ? t.viewResults : (answers.length > 0 ? t.continueBtn : t.startBtn)}</button>

              <button
                onClick={() => setShowScanner(true)}
                className="mt-4 flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-50 hover:border-indigo-100 transition-all shadow-sm hover:shadow-md"
              >
                <Camera className="w-4 h-4" />
                {locale === 'fr' ? 'Importer depuis un rapport PDF' : 'Import from PDF Report'}
              </button>

              {(hasCompletedReport || answers.length > 0) && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure? This will clear your current progress.")) {
                      restart();
                      setTimeout(() => setShowIntro(true), 100);
                    }
                  }}
                  className="mt-4 text-xs font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors"
                >
                  {t.startNewBtn}
                </button>
              )}

              <MethodologySection t={t} onShowMethods={() => setShowMethods(true)} />

              <FAQAccordion items={t.faq} title={t.faqTitle} />
            </div>
          </main>
        ) : showBreak ? (
          <BreakMoment
            t={t}
            onContinue={() => {
              setShowBreak(false);
              setCurrentIndex(prev => prev + 1);
            }}
          />
        ) : (
          <main className="flex-1 flex flex-col items-center pt-24 p-4 sm:p-12 pb-24">
            <nav className="w-full max-w-4xl flex items-center justify-between mb-8 sm:mb-12">
              <button onClick={() => window.history.back()} className="p-2 text-slate-400 hover:text-slate-800 transition-colors"><ChevronLeft className="w-6 h-6" /></button>
              <div className="flex flex-col items-center gap-1">
                {assessmentMode === 'modular' && selectedPhase && (
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {t.phases[selectedPhase] || selectedPhase}
                  </span>
                )}
                <div className="text-[10px] sm:text-xs font-black text-indigo-600 bg-indigo-50 px-3 sm:px-4 py-1.5 rounded-full shrink-0">
                  {currentIndex + 1} / {activeQuestions.length}
                </div>
              </div>
              <div className="w-10" /> {/* Spacer */}
            </nav>
            <div className="w-full max-w-4xl h-2 bg-slate-200 rounded-full mb-12 sm:mb-16 overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }} />
            </div>
            <article className={`w-full max-w-4xl bg-white dark:bg-slate-800 p-4 sm:p-24 rounded-[3rem] sm:rounded-[4rem] shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-500 ${isAdvancing ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'}`}>
              <span className="inline-block px-3 py-1 bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 sm:mb-8">{(t.subscales as any)[activeQuestions[currentIndex].subscale] || activeQuestions[currentIndex].subscale}</span>
              <h2 className="text-xl sm:text-4xl font-black text-slate-900 dark:text-white leading-[1.3] mb-12 sm:mb-20 tracking-tight min-h-[5rem] sm:min-h-[6rem]">{activeQuestions[currentIndex].text[locale]}</h2>
              <LikertScale
                key={activeQuestions[currentIndex].id}
                value={answers.find(a => a.questionId === activeQuestions[currentIndex].id)?.score ?? -1}
                onChange={handleAnswer}
                locale={locale}
                type={activeQuestions[currentIndex].scale}
              />
              <div className="mt-16 sm:mt-20 flex justify-between items-center">
                <button
                  disabled={isAdvancing || (currentIndex === 0 && assessmentMode !== 'modular')}
                  onClick={() => window.history.back()}
                  className={`text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all ${currentIndex === 0 && assessmentMode !== 'modular' ? 'opacity-0 pointer-events-none' : ''}`}
                >
                  ← {t.back}
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex(-1);
                    if (assessmentMode === 'modular') {
                      setSelectedPhase(null);
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  {t.saveAndExit}
                </button>
              </div>
            </article>
          </main>
        )}
      </div>

      <footer className="w-full py-10 sm:py-12 bg-white dark:bg-slate-900 text-center flex flex-col items-center gap-2 mt-auto border-t border-slate-100 dark:border-slate-800 shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
        <p className="px-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] leading-relaxed max-w-2xl">{t.footer}</p>
        <p className="text-[10px] font-medium text-slate-400">
          Vibe coded by Kash <span className="cursor-pointer hover:scale-125 inline-block transition-transform" onClick={handleUnicornClick}>🦄</span> - 2026 - Open Source - Sharing is caring ❤️
        </p>
      </footer>
    </div>
  );
};

export default App;
