import re

file_path = 'App.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# Define old and new FeedbackBanner definition
# This is a bit safer if we match multiple lines
old_def = r'const FeedbackBanner: React.FC<\{ locale: Locale \}> = \(\{ locale \}\) => \{[^}]*handleFeedbackClick[^}]*return \('
new_def = """const FeedbackBanner: React.FC<{ locale: Locale, onOpen: () => void }> = ({ locale, onOpen }) => {
  return ("""

content = re.sub(r'const FeedbackBanner: React.FC<\{ locale: Locale \}> = \(\{ locale \}\) => \{(\s*)const handleFeedbackClick = \(\) => \{[^}]+\};',
                 r'const FeedbackBanner: React.FC<{ locale: Locale, onOpen: () => void }> = ({ locale, onOpen }) => {',
                 content)

# Update the button onClick in FeedbackBanner again just to be sure
# The previous regex might have missed if it was multi-line or formatted differently
# So let's look for onClick={handleFeedbackClick} inside FeedbackBanner
content = content.replace('onClick={handleFeedbackClick}', 'onClick={onOpen}')

# Ensure onOpen is used in the FeedbackBanner call
# I already checked with grep and it seemed to have been updated to onOpen={handleOpenFeedback}
# But let's double check

with open(file_path, 'w') as f:
    f.write(content)

print("App.tsx fixed")
