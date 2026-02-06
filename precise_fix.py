import re

file_path = 'App.tsx'

with open(file_path, 'r') as f:
    content = f.read()

old_start = 'const FeedbackBanner: React.FC<{ locale: Locale }> = ({ locale }) => {'
new_start = 'const FeedbackBanner: React.FC<{ locale: Locale, onOpen: () => void }> = ({ locale, onOpen }) => {'

if old_start in content:
    # Find the end of the function body part we want to replace
    # We want to replace up to "return ("
    # But wait, handleFeedbackClick is inside.

    # Let's find the position of old_start
    start_idx = content.find(old_start)

    # Find "return (" after start_idx
    return_idx = content.find('return (', start_idx)

    # Construct the new content
    # Everything before old_start
    # New start
    # Everything after return_idx (inclusive of return ()

    new_content = content[:start_idx] + new_start + '\n  ' + content[return_idx:]

    # Now replace handleFeedbackClick usage inside the return block
    # We need to act on new_content
    # Find onClick={handleFeedbackClick} after the new start
    # But wait, handleFeedbackClick is gone now (it was between start_idx and return_idx).
    # So we just need to replace the usage in JSX.

    new_content = new_content.replace('onClick={handleFeedbackClick}', 'onClick={onOpen}')

    with open(file_path, 'w') as f:
        f.write(new_content)
    print("App.tsx precise fix applied")
else:
    print("Could not find old FeedbackBanner definition")
