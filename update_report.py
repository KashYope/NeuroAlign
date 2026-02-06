import re

file_path = 'components/Report.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# 1. Update imports
if 'import React, { useState, useRef }' in content:
    content = content.replace("import React, { useState, useRef }", "import React, { useState, useRef, useEffect }")

# 2. Update Interface
if 'onReview?: () => void;' in content and 'onScrollTrigger?:' not in content:
    content = content.replace("  onReview?: () => void;", "  onReview?: () => void;\n  onScrollTrigger?: () => void;")

# 3. Update Component Signature
old_sig = "const Report: React.FC<ReportProps> = ({ report, answers, onReset, onReview, locale }) => {"
new_sig = "const Report: React.FC<ReportProps> = ({ report, answers, onReset, onReview, locale, onScrollTrigger }) => {"
if old_sig in content:
    content = content.replace(old_sig, new_sig)

# 4. Add useEffect
effect_code = """
  useEffect(() => {
    if (!onScrollTrigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onScrollTrigger();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const target = document.getElementById(`domain-${Phase.DYSPRAXIA}`);
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [onScrollTrigger]);
"""

# Insert after `const t: Translation = translations[locale];`
insertion_marker = "const t: Translation = translations[locale];"
if insertion_marker in content and 'const observer = new IntersectionObserver' not in content:
    content = content.replace(insertion_marker, insertion_marker + effect_code)

# 5. Update renderDomainSection
# Find `<div key={domain.name}`
# Replace with `<div id={\`domain-${domain.name}\`} key={domain.name}`
# Python string replacement doesn't need escape for backticks unless in f-string
old_div = '<div key={domain.name}'
new_div = '<div id={`domain-${domain.name}`} key={domain.name}'

if old_div in content:
    content = content.replace(old_div, new_div)

with open(file_path, 'w') as f:
    f.write(content)

print("Report.tsx updated")
