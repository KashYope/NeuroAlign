import React from 'react';
import { Translation } from '../types';
import { Sparkles, CupSoda, Footprints, Wind, Eye, PersonStanding } from 'lucide-react';

interface BreakMomentProps {
    t: Translation;
    onContinue: () => void;
}

const BreakMoment: React.FC<BreakMomentProps> = ({ t, onContinue }) => {
    const { breakMoments } = t as any;

    // Choose a random icon and message
    const randomIndex = Math.floor(Math.random() * breakMoments.messages.length);
    const message = breakMoments.messages[randomIndex];

    const icons = [
        <CupSoda className="w-8 h-8" />,
        <PersonStanding className="w-8 h-8" />,
        <Wind className="w-8 h-8" />,
        <Footprints className="w-8 h-8" />,
        <Eye className="w-8 h-8" />,
        <Sparkles className="w-8 h-8" />
    ];

    const icon = icons[randomIndex % icons.length];

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
            <div className="max-w-xl w-full bg-white p-12 sm:p-20 rounded-[3rem] sm:rounded-[4rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
                    {icon}
                </div>

                <h2 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-6">
                    {breakMoments.title}
                </h2>

                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight mb-8 tracking-tight">
                    {breakMoments.congrats}
                </h3>

                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 mb-12">
                    <p className="text-lg sm:text-xl text-slate-600 font-bold leading-relaxed italic">
                        "{message}"
                    </p>
                </div>

                <button
                    onClick={onContinue}
                    className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 flex items-center justify-center gap-3"
                >
                    {breakMoments.continue}
                    <Sparkles className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default BreakMoment;
