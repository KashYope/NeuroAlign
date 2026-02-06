import React from 'react';
import { Translation, Phase, UserAnswer } from '../types';
import { QUESTIONS } from '../questions';
import ModuleIcon from './ModuleIcon';
import { ChevronRight, CheckCircle2, Play } from 'lucide-react';

interface ModuleSelectionProps {
    t: Translation;
    answers: UserAnswer[];
    onSelect: (phase: Phase) => void;
    onRetake: (phase: Phase) => void;
    onBack: () => void;
    onViewResults: () => void;
}

const ModuleSelection: React.FC<ModuleSelectionProps> = ({ t, answers, onSelect, onRetake, onBack, onViewResults }) => {
    const modules = [
        Phase.AUTISM,
        Phase.ADHD,
        Phase.DYSLEXIA,
        Phase.DYSCALCULIA,
        Phase.DYSPRAXIA,
        Phase.IMPACT
    ];

    const getModuleStats = (phase: Phase) => {
        const moduleQuestions = QUESTIONS.filter(q => q.phase === phase);
        const completedCount = moduleQuestions.filter(mq => answers.some(a => a.questionId === mq.id)).length;
        return {
            total: moduleQuestions.length,
            completed: completedCount,
            isFinished: completedCount === moduleQuestions.length && moduleQuestions.length > 0
        };
    };

    return (
        <div className="flex-1 flex flex-col items-center pt-16 sm:pt-24 px-4 sm:px-6 animate-in fade-in duration-700">
            <div className="max-w-4xl w-full">
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight text-center">
                    {t.assessmentIntro.modularTitle}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-center font-medium mb-12 max-w-2xl mx-auto">
                    {t.assessmentIntro.modularDesc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                    {modules.map((phase) => {
                        const stats = getModuleStats(phase);
                        const key = phase.toLowerCase().replace(/\s+/g, '');
                        const title = t.phases[phase] || phase;
                        const description = t.domainIntros[key] || '';

                        return (
                            <div
                                key={phase}
                                onClick={() => stats.isFinished ? onViewResults() : onSelect(phase)}
                                className="group relative bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-indigo-100/30 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left cursor-pointer"
                            >
                                <div className="w-full flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                        <ModuleIcon name={key} className="w-6 h-6" />
                                    </div>
                                    {stats.isFinished ? (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Completed
                                        </div>
                                    ) : stats.completed > 0 ? (
                                        <div className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-100">
                                            In Progress
                                        </div>
                                    ) : null}
                                </div>

                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6 flex-1">
                                    {description}
                                </p>

                                <div className="w-full flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.methodsPage.assessmentBreakdown.questions}</span>
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{stats.completed} / {stats.total}</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                            {stats.isFinished ? t.viewResults : t.assessmentIntro.startModuleBtn}
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                        {stats.isFinished && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onRetake(phase);
                                                }}
                                                className="text-[10px] font-bold text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors z-10"
                                            >
                                                {t.retake}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center gap-4 mb-24">
                    <button
                        onClick={onBack}
                        className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        {t.back}
                    </button>
                    {answers.length > 0 && (
                        <button
                            onClick={onViewResults}
                            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none"
                        >
                            {t.viewResults}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModuleSelection;
