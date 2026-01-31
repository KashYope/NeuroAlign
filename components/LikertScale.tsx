
import React, { useRef } from 'react';
import { Locale, ScaleType } from '../types';
import { translations } from '../i18n';

interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
  locale: Locale;
  type?: ScaleType;
}

interface Option {
  val: number;
  labelKey: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
  hoverBorder: string;
}

const getScaleConfig = (type: ScaleType): Option[] => {
  switch (type) {
    case 'yes_no':
      return [
        { val: 0, labelKey: 'no', activeBg: 'bg-rose-500', activeBorder: 'border-rose-500', activeText: 'text-rose-600', hoverBorder: 'hover:border-rose-300' },
        { val: 1, labelKey: 'yes', activeBg: 'bg-emerald-500', activeBorder: 'border-emerald-500', activeText: 'text-emerald-700', hoverBorder: 'hover:border-emerald-300' },
      ];

    case 'frequency_0_4': // 0-4
      return [
        { val: 0, labelKey: 'frequency.never', activeBg: 'bg-slate-200', activeBorder: 'border-slate-300', activeText: 'text-slate-500', hoverBorder: 'hover:border-slate-300' },
        { val: 1, labelKey: 'frequency.rarely', activeBg: 'bg-indigo-200', activeBorder: 'border-indigo-300', activeText: 'text-indigo-600', hoverBorder: 'hover:border-indigo-300' },
        { val: 2, labelKey: 'frequency.sometimes', activeBg: 'bg-indigo-300', activeBorder: 'border-indigo-400', activeText: 'text-indigo-700', hoverBorder: 'hover:border-indigo-400' },
        { val: 3, labelKey: 'frequency.often', activeBg: 'bg-indigo-400', activeBorder: 'border-indigo-500', activeText: 'text-indigo-800', hoverBorder: 'hover:border-indigo-500' },
        { val: 4, labelKey: 'frequency.veryOften', activeBg: 'bg-indigo-600', activeBorder: 'border-indigo-600', activeText: 'text-indigo-900', hoverBorder: 'hover:border-indigo-600' },
      ];

    case 'frequency_1_5': // 1-5 (Same as old 'frequency')
      return [
        { val: 1, labelKey: 'frequency.never', activeBg: 'bg-slate-200', activeBorder: 'border-slate-300', activeText: 'text-slate-500', hoverBorder: 'hover:border-slate-300' },
        { val: 2, labelKey: 'frequency.rarely', activeBg: 'bg-indigo-200', activeBorder: 'border-indigo-300', activeText: 'text-indigo-600', hoverBorder: 'hover:border-indigo-300' },
        { val: 3, labelKey: 'frequency.sometimes', activeBg: 'bg-indigo-300', activeBorder: 'border-indigo-400', activeText: 'text-indigo-700', hoverBorder: 'hover:border-indigo-400' },
        { val: 4, labelKey: 'frequency.often', activeBg: 'bg-indigo-400', activeBorder: 'border-indigo-500', activeText: 'text-indigo-800', hoverBorder: 'hover:border-indigo-500' },
        { val: 5, labelKey: 'frequency.veryOften', activeBg: 'bg-indigo-600', activeBorder: 'border-indigo-600', activeText: 'text-indigo-900', hoverBorder: 'hover:border-indigo-600' },
      ];

    case 'frequency_0_3': // 0-3 (ADC)
      return [
        { val: 0, labelKey: 'frequency.never', activeBg: 'bg-slate-200', activeBorder: 'border-slate-300', activeText: 'text-slate-500', hoverBorder: 'hover:border-slate-300' },
        { val: 1, labelKey: 'frequency.sometimes', activeBg: 'bg-indigo-300', activeBorder: 'border-indigo-400', activeText: 'text-indigo-700', hoverBorder: 'hover:border-indigo-400' },
        { val: 2, labelKey: 'frequency.often', activeBg: 'bg-indigo-500', activeBorder: 'border-indigo-500', activeText: 'text-indigo-800', hoverBorder: 'hover:border-indigo-500' },
        { val: 3, labelKey: 'frequency.always', activeBg: 'bg-indigo-700', activeBorder: 'border-indigo-700', activeText: 'text-indigo-100', hoverBorder: 'hover:border-indigo-600' },
      ];

    case 'likert_7': // 1-7 (CAT-Q)
      return [
        { val: 1, labelKey: 'stronglyDisagree', activeBg: 'bg-rose-600', activeBorder: 'border-rose-600', activeText: 'text-rose-700', hoverBorder: 'hover:border-rose-400' },
        { val: 2, labelKey: 'disagree', activeBg: 'bg-rose-500', activeBorder: 'border-rose-500', activeText: 'text-rose-600', hoverBorder: 'hover:border-rose-300' },
        { val: 3, labelKey: 'somewhatDisagree', activeBg: 'bg-rose-300', activeBorder: 'border-rose-300', activeText: 'text-rose-500', hoverBorder: 'hover:border-rose-200' },
        { val: 4, labelKey: 'neutral', activeBg: 'bg-slate-300', activeBorder: 'border-slate-300', activeText: 'text-slate-600', hoverBorder: 'hover:border-slate-200' },
        { val: 5, labelKey: 'somewhatAgree', activeBg: 'bg-emerald-300', activeBorder: 'border-emerald-300', activeText: 'text-emerald-500', hoverBorder: 'hover:border-emerald-200' },
        { val: 6, labelKey: 'agree', activeBg: 'bg-emerald-500', activeBorder: 'border-emerald-500', activeText: 'text-emerald-600', hoverBorder: 'hover:border-emerald-300' },
        { val: 7, labelKey: 'stronglyAgree', activeBg: 'bg-emerald-600', activeBorder: 'border-emerald-600', activeText: 'text-emerald-700', hoverBorder: 'hover:border-emerald-400' },
      ];

    case 'likert_5':
    default:
      return [
        { val: 1, labelKey: 'stronglyDisagree', activeBg: 'bg-rose-500', activeBorder: 'border-rose-500', activeText: 'text-rose-600', hoverBorder: 'hover:border-rose-300' },
        { val: 2, labelKey: 'disagree', activeBg: 'bg-orange-400', activeBorder: 'border-orange-400', activeText: 'text-orange-600', hoverBorder: 'hover:border-orange-300' },
        { val: 3, labelKey: 'neutral', activeBg: 'bg-slate-400', activeBorder: 'border-slate-400', activeText: 'text-slate-600', hoverBorder: 'hover:border-slate-300' },
        { val: 4, labelKey: 'agree', activeBg: 'bg-lime-500', activeBorder: 'border-lime-500', activeText: 'text-lime-600', hoverBorder: 'hover:border-lime-300' },
        { val: 5, labelKey: 'stronglyAgree', activeBg: 'bg-emerald-500', activeBorder: 'border-emerald-500', activeText: 'text-emerald-700', hoverBorder: 'hover:border-emerald-300' },
      ];
  }
};

const LikertScale: React.FC<LikertScaleProps> = ({ value, onChange, locale, type = 'likert_5' }) => {
  const t = translations[locale].likert;
  const containerRef = useRef<HTMLDivElement>(null);
  const options = getScaleConfig(type as ScaleType);

  // Helper to safely access nested keys
  const getLabel = (key: string) => {
    if (key.includes('.')) {
      const parts = key.split('.');
      // @ts-ignore
      return t[parts[0]]?.[parts[1]] || key;
    }
    // @ts-ignore
    return t[key] || key;
  };

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

  const isYesNo = type === 'yes_no';
  const isSeven = type === 'likert_7';

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label="Likert scale options"
      className={`flex flex-row ${isYesNo ? 'justify-center gap-12' : 'justify-between gap-0 sm:gap-2'} w-full max-w-4xl mx-auto py-8`}
    >
      {options.map((opt, index) => {
        const isActive = value === opt.val;
        const isTabStop = value === opt.val || (value === 0 && index === Math.floor(options.length / 2));
        const label = getLabel(opt.labelKey as string);

        // Responsive sizing based on count
        const circleSize = isYesNo ? 'w-20 h-20 sm:w-24 sm:h-24' : isSeven ? 'w-8 h-8 sm:w-12 sm:h-12' : 'w-10 h-10 sm:w-16 sm:h-16';
        const fontSize = isSeven ? 'text-[6px] sm:text-[9px]' : 'text-[7px] sm:text-[10px]';

        return (
          <button
            key={opt.val}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            tabIndex={isTabStop ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => onChange(opt.val)}
            className={`group flex flex-col items-center ${isYesNo ? 'flex-none' : 'flex-1'} min-w-0 transition-all outline-none focus-visible:ring-4 focus-visible:ring-indigo-600 focus-visible:ring-offset-8 rounded-3xl`}
          >
            {/* The Circle Container */}
            <div className={`${circleSize} rounded-full border-[2.5px] mb-2 sm:mb-6 flex items-center justify-center transition-all duration-300 ${isActive
              ? `${opt.activeBg} ${opt.activeBorder} scale-110 shadow-lg shadow-current/20`
              : 'border-slate-200 bg-white hover:border-slate-400 group-focus-visible:border-indigo-600'
              }`}>
              {isActive && (
                <div className={`${isSeven ? 'w-2 h-2 sm:w-3 sm:h-3' : 'w-3 h-3 sm:w-5 sm:h-5'} bg-white rounded-full shadow-inner animate-in zoom-in duration-300`} />
              )}
            </div>

            {/* The Label */}
            <span className={`${fontSize} font-black text-center uppercase tracking-normal sm:tracking-[0.2em] leading-tight transition-colors duration-300 w-full sm:w-[110px] min-h-[3rem] flex items-start justify-center text-balance px-1 ${isActive ? opt.activeText : 'text-slate-500 group-hover:text-slate-800'
              }`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default LikertScale;
