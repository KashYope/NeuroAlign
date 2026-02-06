import re

file_path = 'App.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# 1. Import
if 'import FeedbackModal' not in content:
    content = content.replace("import { EffectType } from './types';", "import { EffectType } from './types';\nimport FeedbackModal from './components/FeedbackModal';")

# 2. Update FeedbackBanner
# Find the FeedbackBanner component
banner_pattern = r'const FeedbackBanner: React.FC<\{ locale: Locale \}> = \(\{ locale \}\) => \{[^}]*handleFeedbackClick[^}]*return \('
banner_replacement = """const FeedbackBanner: React.FC<{ locale: Locale, onOpen: () => void }> = ({ locale, onOpen }) => {
  return ("""

# We need to be careful with the regex. Let's just replace the signature and remove the handleFeedbackClick function.
content = re.sub(r'const FeedbackBanner: React.FC<\{ locale: Locale \}> = \(\{ locale \}\) => \{(\s*)const handleFeedbackClick = \(\) => \{[^}]+\};',
                 r'const FeedbackBanner: React.FC<{ locale: Locale, onOpen: () => void }> = ({ locale, onOpen }) => {',
                 content)

# Update the button onClick in FeedbackBanner
content = content.replace('onClick={handleFeedbackClick}', 'onClick={onOpen}')

# 3. Add state and handlers to App
state_insertion_point = 'const [effectCanvasRef] = useState' # This might not exist or be hard to find.
# Let's find "const [isDark, setIsDark] = useState" and insert after the last state hook.
# Or just insert at the beginning of App component.

app_start = 'const App: React.FC = () => {'
state_code = """
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasFeedbackTriggered, setHasFeedbackTriggered] = useState(false);

  const handleOpenFeedback = () => setShowFeedback(true);

  const handleTriggerFeedback = () => {
    if (!hasFeedbackTriggered) {
      setShowFeedback(true);
      setHasFeedbackTriggered(true);
    }
  };
"""
content = content.replace(app_start, app_start + state_code)

# 4. Update usages
# FeedbackBanner usage
content = content.replace('<FeedbackBanner locale={locale} />', '<FeedbackBanner locale={locale} onOpen={handleOpenFeedback} />')

# Report usage
# We need to find <Report ... /> and add onScrollTrigger
# It's likely spread across lines.
report_usage = r'<Report report=\{report\} answers=\{answers\} onReset=\{restart\} locale=\{locale\} onReview=\{\(\) => setShowReview\(true\)\} />'
report_replacement = '<Report report={report} answers={answers} onReset={restart} locale={locale} onReview={() => setShowReview(true)} onScrollTrigger={handleTriggerFeedback} />'
content = re.sub(r'<Report\s+report=\{report\}\s+answers=\{answers\}\s+onReset=\{restart\}\s+locale=\{locale\}\s+onReview=\{\(\) => setShowReview\(true\)\}\s+/>',
                 report_replacement,
                 content)

# 5. Render Modal
# Insert before the closing </div> of the main return
# Look for <footer ... </footer>
# Then insert before the final closing tag.
# Or just after FeedbackBanner call? No, it should be at root level inside the div or outside.
# Let's put it after DebugOverlay.

content = content.replace('<DebugOverlay', '<FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} t={t} locale={locale} />\n      <DebugOverlay')

with open(file_path, 'w') as f:
    f.write(content)

print("App.tsx updated")
