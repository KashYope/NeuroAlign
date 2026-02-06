def fix_app():
    with open('App.tsx', 'r') as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        if 'Vibe coded by Kash' in line:
            # Reconstruct this line and the following ones to be correct
            new_lines.append('          Vibe coded by Kash <span className="cursor-pointer hover:scale-125 inline-block transition-transform" onClick={handleUnicornClick}>🦄</span> - 2026 - Open Source - Sharing is caring ❤️\n')
            new_lines.append('        </p>\n')
            new_lines.append("        <button onClick={() => { setShowLegal(true); window.history.pushState({ page: 'legal' }, ''); }} className=\"mt-4 text-[10px] font-bold text-slate-300 hover:text-slate-500 uppercase tracking-widest transition-colors\">{t.legal?.footerLink || 'CGU & Privacy'}</button>\n")
        elif '<button onClick={() => { setShowLegal(true)' in line:
            # Skip this line as we added it above
            continue
        elif 'Vibe coded by Kash' in lines[lines.index(line)-1] if lines.index(line)>0 else False:
             # This handles the case where the previous line was the broken one and we might have trailing garbage or the next line is the button
             # But since I'm iterating, the index lookbehind is risky.
             # Simpler approach:
             # Just identifying the broken state.
             pass
             new_lines.append(line)
        else:
             new_lines.append(line)

    # Actually, the logic above is a bit flaky because of the iterator.
    # Let's do a read-entire-file and replace approach.

    with open('App.tsx', 'r') as f:
        content = f.read()

    # The broken segment looks like:
    # Vibe coded by Kash <span ...>🦄</span> - 2026 - Open Source -  \n        <button ...

    broken_part = 'Vibe coded by Kash <span className="cursor-pointer hover:scale-125 inline-block transition-transform" onClick={handleUnicornClick}>🦄</span> - 2026 - Open Source -  \n        <button'

    fixed_part = 'Vibe coded by Kash <span className="cursor-pointer hover:scale-125 inline-block transition-transform" onClick={handleUnicornClick}>🦄</span> - 2026 - Open Source - Sharing is caring ❤️\n        </p>\n        <button'

    if broken_part in content:
        content = content.replace(broken_part, fixed_part)
        with open('App.tsx', 'w') as f:
            f.write(content)
        print("Fixed App.tsx")
    else:
        print("Could not find the specific broken pattern. Dumping last 500 chars to debug.")
        print(content[-500:])

if __name__ == "__main__":
    fix_app()
