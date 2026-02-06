import re

def fix_app():
    with open('App.tsx', 'r') as f:
        content = f.read()

    # Find the footer start
    start_marker = '<footer className="w-full py-10'
    end_marker = '</footer>'

    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    if start_idx != -1 and end_idx != -1:
        end_idx += len(end_marker)

        new_footer = """<footer className="w-full py-10 sm:py-12 bg-white dark:bg-slate-900 text-center flex flex-col items-center gap-2 mt-auto border-t border-slate-100 dark:border-slate-800 shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
        <p className="px-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] leading-relaxed max-w-2xl">{t.footer}</p>
        <p className="text-[10px] font-medium text-slate-400">
          Vibe coded by Kash <span className="cursor-pointer hover:scale-125 inline-block transition-transform" onClick={handleUnicornClick}>🦄</span> - 2026 - Open Source - Sharing is caring ❤️
        </p>
        <button onClick={() => { setShowLegal(true); window.history.pushState({ page: 'legal' }, ''); }} className="mt-4 text-[10px] font-bold text-slate-300 hover:text-slate-500 uppercase tracking-widest transition-colors">{t.legal?.footerLink || 'CGU & Privacy'}</button>
      </footer>"""

        new_content = content[:start_idx] + new_footer + content[end_idx:]

        with open('App.tsx', 'w') as f:
            f.write(new_content)
        print("Successfully replaced footer in App.tsx")
    else:
        print("Could not find footer boundaries")

if __name__ == "__main__":
    fix_app()
