import React, { useState } from 'react';
import { Translation } from '../types';
import { ChevronLeft, Shield, Server, Database, EyeOff, FileText, User } from 'lucide-react';

interface LegalPageProps {
  t: Translation;
  onBack: () => void;
}

const ObfuscatedEmail = ({ email }: { email: string }) => {
  const [revealed, setRevealed] = useState(false);
  const [user] = email.split('@');

  const handleClick = () => {
    setRevealed(true);
    window.location.href = `mailto:${email}`;
  };

  if (revealed) {
    return <span className="font-mono text-indigo-600 font-bold break-all">{email}</span>;
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer"
      title="Click to reveal"
    >
      <span>{user.substring(0, 3)}...@...</span>
      <span className="text-xs uppercase tracking-wider opacity-70">(Click to reveal)</span>
    </button>
  );
};

const LegalPage: React.FC<LegalPageProps> = ({ t, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center pt-24 p-4 sm:p-12 pb-24 animate-in fade-in zoom-in duration-500">
       <nav className="w-full max-w-4xl flex items-center justify-between mb-8 sm:mb-12">
          <button onClick={onBack} className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center gap-2 font-bold text-sm uppercase tracking-widest">
            <ChevronLeft className="w-5 h-5" />
            {t.legal.backBtn}
          </button>
       </nav>

       <article className="w-full max-w-4xl bg-white dark:bg-slate-800 p-8 sm:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
          <header className="mb-12 border-b border-slate-100 dark:border-slate-700 pb-8">
             <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
               {t.legal.title}
             </h1>
          </header>

          <section className="mb-12">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
               <User className="w-6 h-6 text-indigo-600" />
               {t.legal.mentions.title}
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              <p>{t.legal.mentions.editor}</p>
              <p>{t.legal.mentions.address}</p>
              <p>{t.legal.mentions.hosting}</p>
              <div className="flex flex-wrap items-center gap-2">
                 <span>Contact:</span>
                 <ObfuscatedEmail email="cestmoikash+neuroalign@gmail.com" />
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
               <Shield className="w-6 h-6 text-emerald-600" />
               {t.legal.privacy.title}
            </h2>
            <p className="mb-6 text-slate-600 dark:text-slate-300 font-medium">{t.legal.privacy.intro}</p>

            <div className="grid gap-6 md:grid-cols-3">
               <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <Server className="w-8 h-8 text-indigo-500 mb-4" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t.legal.privacy.localProcessing.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t.legal.privacy.localProcessing.text}</p>
               </div>
               <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <Database className="w-8 h-8 text-indigo-500 mb-4" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t.legal.privacy.noDatabase.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t.legal.privacy.noDatabase.text}</p>
               </div>
               <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <EyeOff className="w-8 h-8 text-indigo-500 mb-4" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t.legal.privacy.rights.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t.legal.privacy.rights.text}</p>
               </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
               <FileText className="w-6 h-6 text-slate-600" />
               {t.legal.terms.title}
            </h2>
             <div className="space-y-6 text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
               <div>
                 <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t.legal.terms.disclaimer.title}</h3>
                 <p>{t.legal.terms.disclaimer.text}</p>
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t.legal.terms.usage.title}</h3>
                 <p>{t.legal.terms.usage.text}</p>
               </div>
             </div>
          </section>

       </article>
    </div>
  );
};

export default LegalPage;
