import React from 'react';
import { QUESTIONS } from '../questions';
import { Phase } from '../types';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Layout, FileText, Activity, Brain } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface MethodsPageProps {
    onBack: () => void;
    onStart: () => void;
    t: any;
    locale: string;
}

const MethodModuleCard: React.FC<{
    title: string;
    subtitle: string;
    tool: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
    citations?: { text: string; url: string }[];
    stats: { q: number; s: number };
    labels: { questions: string; subscales: string };
}> = ({ title, subtitle, tool, desc, icon, color, citations, stats, labels }) => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex flex-col h-full">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6`}>
            {icon}
        </div>
        <div className="mb-4">
            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{title}</h3>
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
            <div className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                {tool}
            </div>
            <div className="px-3 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-lg text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <span>{stats.q} {labels.questions}</span>
                <span className="opacity-50">•</span>
                <span>{stats.s} {labels.subscales}</span>
            </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8 flex-grow">
            {desc}
        </p>

        {citations && citations.length > 0 && (
            <div className="mt-auto pt-6 border-t border-slate-50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Sources</p>
                <div className="flex flex-wrap gap-3">
                    {citations.map((cite, idx) => (
                        <a
                            key={idx}
                            href={cite.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            {cite.text}
                        </a>
                    ))}
                </div>
            </div>
        )}
    </div>
);

const MethodsPage: React.FC<MethodsPageProps> = ({ onBack, onStart, t, locale }) => {
    const content = t.methodsPage;

    // Helper to get stats
    const getStats = (phase: Phase) => {
        const phaseQuestions = QUESTIONS.filter(q => q.phase === phase);
        const subscales = new Set(phaseQuestions.map(q => q.subscale));
        return { q: phaseQuestions.length, s: subscales.size };
    };

    const stats = {
        adhd: getStats(Phase.ADHD),
        autism: getStats(Phase.AUTISM),
        dyslexia: getStats(Phase.DYSLEXIA),
        dyspraxia: getStats(Phase.DYSPRAXIA),
        dyscalculia: getStats(Phase.DYSCALCULIA),
    };

    const chartData = {
        labels: [
            content.modules.adhd.title.split(': ')[1] || 'ADHD',
            content.modules.autism.title.split(': ')[1] || 'Autism',
            content.modules.dyslexia.title.split(': ')[1] || 'Dyslexia',
            content.modules.dyspraxia.title.split(': ')[1] || 'Dyspraxia',
            content.modules.dyscalculia.title.split(': ')[1] || 'Dyscalculia',
        ],
        datasets: [
            {
                label: content.assessmentBreakdown.questions,
                data: [stats.adhd.q, stats.autism.q, stats.dyslexia.q, stats.dyspraxia.q, stats.dyscalculia.q],
                backgroundColor: [
                    'rgba(249, 115, 22, 0.7)', // Orange (ADHD)
                    'rgba(168, 85, 247, 0.7)', // Purple (Autism)
                    'rgba(59, 130, 246, 0.7)', // Blue (Dyslexia)
                    'rgba(16, 185, 129, 0.7)', // Emerald (Dyspraxia)
                    'rgba(244, 63, 94, 0.7)',  // Rose (Dyscalculia)
                ],
                borderRadius: 8,
                barThickness: 40,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' as const },
                bodyFont: { size: 12 },
                cornerRadius: 8,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { font: { weight: 'bold' as const }, color: '#64748b' }
            },
            x: {
                grid: { display: false },
                ticks: { font: { weight: 'bold' as const }, color: '#64748b' }
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white pb-24">
            {/* Fixed Back Button */}
            <button
                onClick={onBack}
                className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50 flex items-center gap-2 bg-white dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-full shadow-lg shadow-slate-200/50 dark:shadow-none text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-all font-bold text-xs sm:text-sm"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                {content.backBtn}
            </button>

            <div className="max-w-6xl mx-auto px-6 pt-32 sm:pt-40 pb-24">

                {/* Hero */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        {content.title}
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        {content.subtitle}
                    </h1>
                </div>

                {/* Paradigm Shift & Spiky Profile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 animate-in slide-in-from-bottom-8 delay-100 duration-700">
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                            {content.intro.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
                            {content.intro.text}
                        </p>
                    </div>

                    <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 border border-slate-800 animate-in slide-in-from-bottom-8 delay-200 duration-700">
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-indigo-400 rounded-full" />
                            {content.spikyProfile.title}
                        </h2>
                        <p className="text-slate-300 leading-relaxed font-medium text-lg mb-8">
                            {content.spikyProfile.text}
                        </p>
                        {/* Mini visual - Spider Web / Radar Icon */}
                        <div className="flex items-center justify-center opacity-40 mt-6">
                            <svg className="w-24 h-24 text-indigo-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" strokeOpacity="0.5" />
                                <path d="M50 10 L78 22 L90 50 L78 78 L50 90 L22 78 L10 50 L22 22 Z" strokeOpacity="0.5" />
                                <path d="M50 30 L64 36 L70 50 L64 64 L50 70 L36 64 L30 50 L36 36 Z" strokeOpacity="0.5" />
                                <path d="M50 20 L75 35 L70 50 L80 75 L50 80 L25 60 L30 50 L20 25 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="space-y-16 mb-24">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{content.modulesTitle}</h2>
                        <div className="w-24 h-1.5 bg-indigo-600 rounded-full mx-auto mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <MethodModuleCard
                            title={content.modules.adhd.title}
                            subtitle={content.modules.adhd.subtitle}
                            tool={content.modules.adhd.tool}
                            desc={content.modules.adhd.description}
                            color="bg-orange-50 text-orange-600"
                            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                            citations={content.modules.adhd.citations}
                            stats={stats.adhd}
                            labels={content.assessmentBreakdown}
                        />

                        <MethodModuleCard
                            title={content.modules.autism.title}
                            subtitle={content.modules.autism.subtitle}
                            tool={content.modules.autism.tool}
                            desc={content.modules.autism.description}
                            color="bg-purple-50 text-purple-600"
                            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            citations={content.modules.autism.citations}
                            stats={stats.autism}
                            labels={content.assessmentBreakdown}
                        />

                        <MethodModuleCard
                            title={content.modules.dyslexia.title}
                            subtitle={content.modules.dyslexia.subtitle}
                            tool={content.modules.dyslexia.tool}
                            desc={content.modules.dyslexia.description}
                            color="bg-blue-50 text-blue-600"
                            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                            citations={content.modules.dyslexia.citations}
                            stats={stats.dyslexia}
                            labels={content.assessmentBreakdown}
                        />

                        <MethodModuleCard
                            title={content.modules.dyspraxia.title}
                            subtitle={content.modules.dyspraxia.subtitle}
                            tool={content.modules.dyspraxia.tool}
                            desc={content.modules.dyspraxia.description}
                            color="bg-emerald-50 text-emerald-600"
                            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>}
                            citations={content.modules.dyspraxia.citations}
                            stats={stats.dyspraxia}
                            labels={content.assessmentBreakdown}
                        />

                        <MethodModuleCard
                            title={content.modules.dyscalculia.title}
                            subtitle={content.modules.dyscalculia.subtitle}
                            tool={content.modules.dyscalculia.tool}
                            desc={content.modules.dyscalculia.description}
                            color="bg-rose-50 text-rose-600"
                            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                            citations={content.modules.dyscalculia.citations}
                            stats={stats.dyscalculia}
                            labels={content.assessmentBreakdown}
                        />
                    </div>
                </div>

                {/* NEW: Assessment Breakdown Chart */}
                <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 mb-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="md:w-1/3">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{content.assessmentBreakdown.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                {content.assessmentBreakdown.text}
                            </p>
                            <div className="mt-6 flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-slate-900"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        {Object.values(stats).reduce((acc, curr) => acc + curr.q, 0) + 4} {content.assessmentBreakdown.questions} Total
                                        {/* +4 for Intake questions which are not in modules */}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 h-[300px]">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                {/* NEW: What to Expect Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                            {content.whatToExpect.title}
                        </span>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white max-w-2xl mx-auto">{content.whatToExpect.text}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Activity className="w-6 h-6" />, title: content.whatToExpect.items.spikyProfile, color: "text-rose-500 bg-rose-50 dark:bg-rose-900/30" },
                            { icon: <Brain className="w-6 h-6" />, title: content.whatToExpect.items.insights, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/30" },
                            { icon: <FileText className="w-6 h-6" />, title: content.whatToExpect.items.medical, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/30" },
                            { icon: <Layout className="w-6 h-6" />, title: content.whatToExpect.items.impact, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30" },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
                                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scoring */}
                <div className="bg-indigo-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h2 className="text-3xl font-black mb-6 relative z-10">{content.scoring.title}</h2>
                    <p className="text-indigo-100 text-xl leading-relaxed max-w-2xl relative z-10 font-medium">
                        {content.scoring.text}
                    </p>
                </div>

                <div className="mt-20 text-center">
                    <button
                        onClick={onStart}
                        className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
                    >
                        {content.startBtn}
                    </button>
                </div>

                {/* Floating Action Button (FAB) - Fixed Bottom Right */}
                <button
                    onClick={onStart}
                    className="fixed bottom-6 right-6 z-[100] px-6 py-4 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-10 duration-700"
                >
                    <span>{content.startBtn}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
            </div>

        </div>

    );
};

export default MethodsPage;
