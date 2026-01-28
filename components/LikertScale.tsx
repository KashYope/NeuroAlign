
import React, { useRef } from 'react';
import { Locale } from '../types';
import { translations } from '../i18n';

interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
  locale: Locale;
}

interface Option {
  val: number;
  labelKey: keyof typeof translations.en.likert;
  activeBg: string;
  activeBorder: string;
  activeText: string;
  hoverBorder: string;
}

const options: Option[] = [
  { 
    val: 1, 
    labelKey: 'stronglyDisagree', 
    activeBg: 'bg-rose-500', 
    activeBorder: 'border-rose-500', 
    activeText: 'text-rose-600',
    hoverBorder: 'hover:border-rose-300'
  },
  { 
    val: 2, 
    labelKey: 'disagree', 
    activeBg: 'bg-orange-400', 
    activeBorder: 'border-orange-400', 
    activeText: 'text-orange-600',
    hoverBorder: 'hover:border-orange-300'
  },
  { 
    val: 3, 
    labelKey: 'neutral', 
    activeBg: 'bg-slate-400', 
    activeBorder: 'border-slate-400', 
    activeText: 'text-slate-600',
    hoverBorder: 'hover:border-slate-300'
  },
  { 
    val: 4, 
    labelKey: 'agree', 
    activeBg: 'bg-lime-500', 
    activeBorder: 'border-lime-500', 
    activeText: 'text-lime-600',
    hoverBorder: 'hover:border-lime-300'
  },
  { 
    val: 5, 
    labelKey: 'stronglyAgree', 
    activeBg: 'bg-emerald-500', 
    activeBorder: 'border-emerald-500', 
    activeText: 'text-emerald-700',
    hoverBorder: 'hover:border-emerald-300'
  },
];

const LikertScale: React.FC<LikertScaleProps> = ({ value, onChange, locale }) => {
  const t = translations[locale].likert;
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % options.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + options.length) % options.length;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      const buttons = containerRef.current?.querySelectorAll('button');
      if (buttons && buttons[nextIndex]) {
        (buttons[nextIndex] as HTMLElement).focus();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      role="radiogroup"
      aria-label="Likert scale options"
      className="flex flex-col space-y-8 sm:space-y-0 sm:flex-row sm:justify-between w-full max-w-4xl mx-auto py-8"
    >
      {options.map((opt, index) => {
        const isActive = value === opt.val;
        const isTabStop = value === opt.val || (value === 0 && index === 2);
        
        return (
          <button
            key={opt.val}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={t[opt.labelKey]}
            tabIndex={isTabStop ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => onChange(opt.val)}
            className="group flex flex-col items-center flex-1 transition-all outline-none focus-visible:ring-4 focus-visible:ring-indigo-600 focus-visible:ring-offset-8 rounded-3xl"
          >
            {/* The Circle Container */}
            <div className={`w-16 h-16 rounded-full border-[2.5px] mb-6 flex items-center justify-center transition-all duration-300 ${
              isActive 
                ? `${opt.activeBg} ${opt.activeBorder} scale-110 shadow-lg shadow-current/20` 
                : 'border-slate-200 bg-white hover:border-slate-400 group-focus-visible:border-indigo-600'
            }`}>
              {isActive && (
                <div className="w-5 h-5 bg-white rounded-full shadow-inner animate-in zoom-in duration-300" />
              )}
            </div>

            {/* The Label */}
            <span className={`text-[10px] font-black text-center uppercase tracking-[0.2em] leading-tight transition-colors duration-300 w-[110px] min-h-[3rem] flex items-start justify-center ${
              isActive ? opt.activeText : 'text-slate-500 group-hover:text-slate-800'
            }`}>
              {t[opt.labelKey]}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default LikertScale;
