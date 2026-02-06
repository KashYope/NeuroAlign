import React from 'react';
import { Translation } from '../types';
import { BrainCircuit, Timer, LayoutGrid, Info } from 'lucide-react';

interface AssessmentIntroProps {
    t: Translation;
    onChoice: (mode: 'marathon' | 'modular') => void;
    onBack: () => void;
}

const AssessmentIntro: React.FC<AssessmentIntroProps> = ({ t, onChoice, onBack }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-700">
            <div className="max-w-3xl w-full bg-white dark:bg-slate-800 rounded-[2.5rem] sm:rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-8 sm:p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none">
                            <Info className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            {t.assessmentIntro.title}
                        </h2>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium mb-10">
                        {t.assessmentIntro.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-3">
                                {t.assessmentIntro.howToRespondTitle}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                {t.assessmentIntro.howToRespondDesc}
                            </p>
                        </div>
                        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/50 flex flex-col justify-center">
                            <p className="text-xs italic text-indigo-600/80 dark:text-indigo-400/80 font-bold text-center">
                                "There are no right or wrong answers—only your authentic experience."
                            </p>
                        </div>
                    </div>

                    <h3 className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
                        {t.assessmentIntro.chooseModeTitle}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => onChoice('marathon')}
                            className="group p-6 sm:p-8 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl text-left hover:border-indigo-600 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-none transition-all duration-300 active:scale-[0.98]"
                        >
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Timer className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                                {t.assessmentIntro.marathonTitle}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {t.assessmentIntro.marathonDesc}
                            </p>
                        </button>

                        <button
                            onClick={() => onChoice('modular')}
                            className="group p-6 sm:p-8 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl text-left hover:border-indigo-600 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-none transition-all duration-300 active:scale-[0.98]"
                        >
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <LayoutGrid className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                                {t.assessmentIntro.modularTitle}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {t.assessmentIntro.modularDesc}
                            </p>
                        </button>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 px-8 py-6 flex justify-center border-t border-slate-100 dark:border-slate-700">
                    <button
                        onClick={onBack}
                        className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                    >
                        {t.back}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentIntro;
