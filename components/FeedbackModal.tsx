import React, { useState } from 'react';
import { X, Send, Star, MessageSquare } from 'lucide-react';
import { FeedbackCategory, Translation, Locale } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translation;
  locale: Locale;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, t, locale }) => {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [notUsed, setNotUsed] = useState<Record<string, boolean>>({});
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [suggestions, setSuggestions] = useState('');

  if (!isOpen) return null;

  const categories = Object.values(FeedbackCategory);

  const handleRating = (category: string, score: number) => {
    if (notUsed[category]) return;
    setRatings(prev => ({ ...prev, [category]: score }));
  };

  const toggleNotUsed = (category: string) => {
    setNotUsed(prev => {
      const newState = { ...prev, [category]: !prev[category] };
      if (newState[category]) {
        setRatings(current => {
          const newRatings = { ...current };
          delete newRatings[category];
          return newRatings;
        });
      }
      return newState;
    });
  };

  const handleSubmit = () => {
    const user = 'cestmoikash+neuroalign';
    const domain = 'gmail.com';
    const subject = encodeURIComponent('NeuroAlign Beta Feedback');

    let body = 'NeuroAlign Feedback\n\n';

    categories.forEach(cat => {
      const catLabel = t.feedback.categories[cat] || cat;
      const isSkipped = notUsed[cat];
      const score = ratings[cat];

      body += `${catLabel}: ${isSkipped ? 'N/A' : (score ? `${score}/5` : '-')} \n`;
    });

    body += `\n${t.feedback.labels.pros}:\n${pros || '-'}\n\n`;
    body += `${t.feedback.labels.cons}:\n${cons || '-'}\n\n`;
    body += `${t.feedback.labels.suggestions}:\n${suggestions || '-'}\n`;

    window.location.href = `mailto:${user}@${domain}?subject=${subject}&body=${encodeURIComponent(body)}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1">{t.feedback.title}</h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.feedback.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">

          {/* Rating Section */}
          <div className="space-y-4">
            {categories.map(cat => (
              <div key={cat} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 transition-colors hover:border-indigo-100 dark:hover:border-indigo-900/50">
                <div className="flex-1">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    {t.feedback.categories[cat]}
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer group w-fit select-none">
                    <input
                      type="checkbox"
                      checked={!!notUsed[cat]}
                      onChange={() => toggleNotUsed(cat)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      {t.feedback.labels.didNotUse}
                    </span>
                  </label>
                </div>

                <div className={`flex items-center gap-1 ${notUsed[cat] ? 'opacity-25 pointer-events-none grayscale' : ''} transition-all duration-300`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(cat, star)}
                      className="p-1 group relative transition-transform active:scale-90 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          (ratings[cat] || 0) >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300 dark:text-slate-600 hover:text-yellow-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Text Inputs */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">{t.feedback.labels.pros}</label>
              <textarea
                value={pros}
                onChange={(e) => setPros(e.target.value)}
                placeholder={t.feedback.placeholders.pros}
                className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm placeholder-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">{t.feedback.labels.cons}</label>
              <textarea
                value={cons}
                onChange={(e) => setCons(e.target.value)}
                placeholder={t.feedback.placeholders.cons}
                className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm placeholder-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">{t.feedback.labels.suggestions}</label>
              <textarea
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder={t.feedback.placeholders.suggestions}
                className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm placeholder-slate-400"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 sticky bottom-0 z-10 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white uppercase tracking-wider transition-colors"
          >
            {t.feedback.labels.close}
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-2 group"
          >
            <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            {t.feedback.labels.send}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
