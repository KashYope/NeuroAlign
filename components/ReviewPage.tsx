import React, { useState, useMemo, useEffect } from 'react';
import { QUESTIONS } from '../questions';
import { UserAnswer, Locale, Phase, ScaleType } from '../types';
import { translations } from '../i18n';
import { ArrowLeft, Check } from 'lucide-react';

interface ReviewPageProps {
  answers: UserAnswer[];
  onSave: (newAnswers: UserAnswer[]) => void;
  onBack: () => void; // Used if user clicks generic back button or we want to handle "cancel" though UI emphasizes Save
  locale: Locale;
}

// Compact scale configuration adapter
const getScaleOptions = (type: ScaleType) => {
  // reusing values from LikertScale.tsx
  switch (type) {
    case 'yes_no':
      return [
        { val: 0, color: 'bg-rose-500' },
        { val: 1, color: 'bg-emerald-500' },
      ];
    case 'frequency_0_4':
      return [
        { val: 0, color: 'bg-slate-200' },
        { val: 1, color: 'bg-indigo-200' },
        { val: 2, color: 'bg-indigo-300' },
        { val: 3, color: 'bg-indigo-400' },
        { val: 4, color: 'bg-indigo-600' },
      ];
    case 'frequency_1_5':
      return [
        { val: 1, color: 'bg-slate-200' },
        { val: 2, color: 'bg-indigo-200' },
        { val: 3, color: 'bg-indigo-300' },
        { val: 4, color: 'bg-indigo-400' },
        { val: 5, color: 'bg-indigo-600' },
      ];
    case 'frequency_0_3':
      return [
        { val: 0, color: 'bg-slate-200' },
        { val: 1, color: 'bg-indigo-300' },
        { val: 2, color: 'bg-indigo-500' },
        { val: 3, color: 'bg-indigo-700' },
      ];
    case 'likert_7':
      return [
        { val: 1, color: 'bg-rose-600' },
        { val: 2, color: 'bg-rose-500' },
        { val: 3, color: 'bg-rose-300' },
        { val: 4, color: 'bg-slate-300' },
        { val: 5, color: 'bg-emerald-300' },
        { val: 6, color: 'bg-emerald-500' },
        { val: 7, color: 'bg-emerald-600' },
      ];
    default:
      return [];
  }
};

const ReviewPage: React.FC<ReviewPageProps> = ({ answers, onSave, onBack, locale }) => {
  const [localAnswers, setLocalAnswers] = useState<UserAnswer[]>(answers);
  const t = translations[locale];

  // Group questions
  const groupedQuestions = useMemo(() => {
    const groups = new Map<Phase, Map<string, typeof QUESTIONS>>();

    // Maintain order from QUESTIONS array
    QUESTIONS.forEach(q => {
      if (!groups.has(q.phase)) {
        groups.set(q.phase, new Map());
      }
      const phaseGroup = groups.get(q.phase)!;

      if (!phaseGroup.has(q.subscale)) {
        phaseGroup.set(q.subscale, []);
      }
      phaseGroup.get(q.subscale)!.push(q);
    });
    return groups;
  }, []);

  const handleAnswerChange = (questionId: string, score: number) => {
    setLocalAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === questionId);
      if (existing >= 0) {
        const newArr = [...prev];
        newArr[existing] = { ...newArr[existing], score };
        return newArr;
      } else {
        return [...prev, { questionId, score }];
      }
    });
  };

  const getScore = (qid: string) => localAnswers.find(a => a.questionId === qid)?.score;

  // Save button component
  const SaveButton = () => (
    <div className="fixed top-0 left-0 z-[101]">
      <button
        onClick={() => onSave(localAnswers)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-br-2xl shadow-lg dark:shadow-none hover:bg-indigo-700 transition-all flex items-center gap-2 group"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
          {t.saveAndExit || "Save & Exit"}
        </span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-24 px-4 sm:px-6">
      <SaveButton />

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">{locale === 'fr' ? 'Revue des Réponses' : 'Review Answers'}</h1>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">{locale === 'fr' ? 'Modifiez vos réponses ci-dessous. Sauvegardez pour mettre à jour le rapport.' : 'Edit your answers below. Save to update your report.'}</p>
        </div>

        {Array.from(groupedQuestions.entries()).map(([phase, subscales]) => (
          <section key={phase} className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-black text-indigo-600 uppercase tracking-widest mb-6 border-b border-indigo-100 pb-4">
              {t.phases[phase] || phase}
            </h2>

            <div className="space-y-8">
              {Array.from(subscales.entries()).map(([subscale, questions]) => (
                <div key={subscale}>
                  <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 pl-2">
                    {/* @ts-ignore - Dynamic key access */}
                    {t.subscales[subscale] || subscale}
                  </h3>

                  <div className="space-y-2">
                    {questions.map(q => {
                      const currentScore = getScore(q.id);
                      const options = getScaleOptions(q.scale);

                      return (
                        <div key={q.id} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 transition-colors">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                            {q.text[locale]}
                          </p>

                          <div className="flex items-center gap-1 sm:gap-2 shrink-0 self-end sm:self-auto">
                            {options.map((opt) => (
                              <button
                                key={opt.val}
                                onClick={() => handleAnswerChange(q.id, opt.val)}
                                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all border
                                     ${currentScore === opt.val
                                    ? `${opt.color} border-transparent text-white scale-110 shadow-md dark:shadow-none`
                                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-400 text-transparent'
                                  }`}
                                title={`Score: ${opt.val}`}
                              >
                                {currentScore === opt.val && <Check size={12} strokeWidth={4} />}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
