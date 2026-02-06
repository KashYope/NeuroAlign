import re

def fix_app():
    with open('App.tsx', 'r') as f:
        content = f.read()

    # 1. Add Import
    if 'import LegalPage' not in content:
        content = content.replace("import MethodsPage from './components/MethodsPage';", "import MethodsPage from './components/MethodsPage';\nimport LegalPage from './components/LegalPage';")

    # 2. Add State
    if 'const [showLegal, setShowLegal] = useState(false);' not in content:
        content = content.replace("const [showMethods, setShowMethods] = useState(false);", "const [showMethods, setShowMethods] = useState(false);\n  const [showLegal, setShowLegal] = useState(false);")

    # 3. Add Back Button Logic
    # Look for the popstate event listener
    if 'if (showMethods) {' in content and 'if (showLegal) {' not in content:
        content = content.replace("if (showMethods) {", "if (showLegal) {\n          setShowLegal(false);\n        } else if (showMethods) {")

    # 4. Add Render Logic
    # Insert LegalPage before MethodsPage or after it.
    # The render logic is nested: { showMethods ? ... : showReview ? ... }
    # Let's add it as the first check or parallel to MethodsPage
    if 'showMethods ? (' in content and 'showLegal ? (' not in content:
        content = content.replace("{showMethods ? (", "{showLegal ? (\n          <LegalPage t={t} onBack={() => window.history.back()} />\n        ) : showMethods ? (")

    # 5. Add Footer Link
    # Look for the footer text and append the link
    if 'Sharing is caring ❤️' in content:
        footer_pattern = r'(Sharing is caring ❤️\s*</p>)'
        footer_replacement = "\1\n        <button onClick={() => { setShowLegal(true); window.history.pushState({ page: 'legal' }, ''); }} className=\"mt-4 text-[10px] font-bold text-slate-300 hover:text-slate-500 uppercase tracking-widest transition-colors\">{t.legal?.footerLink || 'CGU & Privacy'}</button>"
        content = re.sub(footer_pattern, footer_replacement, content)

    with open('App.tsx', 'w') as f:
        f.write(content)
    print("Successfully updated App.tsx")

if __name__ == "__main__":
    fix_app()
