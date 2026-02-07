import React from 'react';
import { DomainScore, Translation } from '../types';
import { Shield, Target, Zap } from 'lucide-react';

interface ReportSWOTProps {
  domain: DomainScore;
  t: Translation;
  viewMode: 'functional' | 'clinical';
}

const ReportSWOT: React.FC<ReportSWOTProps> = ({ domain, t, viewMode }) => {
  const subscales = Object.entries(domain.subscales).filter(([name]) => !name.startsWith('_'));

  const strengths = subscales.filter(([_, score]) => (score as number) < 30);
  const opportunities = subscales.filter(([_, score]) => (score as number) >= 30 && (score as number) <= 70);
  const challenges = subscales.filter(([_, score]) => (score as number) > 70);

  const renderSection = (title: string, items: [string, any][], icon: React.ReactNode, colorClass: string, bgClass: string) => (
    <div className={`flex flex-col p-4 rounded-2xl ${bgClass} h-full`}>
      <div className={`flex items-center gap-2 mb-3 ${colorClass}`}>
        {icon}
        <h4 className="text-[10px] font-black uppercase tracking-widest">{title}</h4>
      </div>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map(([name, score]) => (
            <li key={name} className="flex justify-between items-center text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="truncate pr-2">{(t.subscales as any)[name] || name}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-white dark:bg-slate-900/50 opacity-70`}>{score}%</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[10px] text-slate-400 italic">None detected.</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6">
      {renderSection(t.reportLabels.swot?.strengths || 'Strengths', strengths, <Shield className="w-4 h-4" />, 'text-emerald-600', 'bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900')}
      {renderSection(t.reportLabels.swot?.opportunities || 'Opportunities', opportunities, <Target className="w-4 h-4" />, 'text-blue-600', 'bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900')}
      {renderSection(t.reportLabels.swot?.challenges || 'Challenges', challenges, <Zap className="w-4 h-4" />, 'text-rose-600', 'bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900')}
    </div>
  );
};

export default ReportSWOT;
