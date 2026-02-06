import re

def update_types():
    with open('types.ts', 'r') as f:
        content = f.read()

    # Define the new legal section to add to Translation interface
    legal_type = """
  legal: {
    title: string;
    backBtn: string;
    mentions: {
      title: string;
      editor: string;
      hosting: string;
      contact: string;
    };
    privacy: {
      title: string;
      intro: string;
      localProcessing: {
        title: string;
        text: string;
      };
      noDatabase: {
        title: string;
        text: string;
      };
      rights: {
        title: string;
        text: string;
      };
    };
    terms: {
      title: string;
      disclaimer: {
        title: string;
        text: string;
      };
      usage: {
        title: string;
        text: string;
      };
    };
    footerLink: string;
  };"""

    # Insert it before the 'errors' property or another suitable location within Translation interface
    # Finding the end of the Translation interface is tricky with regex, so we look for a known property
    # Let's insert it before 'errors: {' which seems to be near the end

    if 'legal:' not in content:
        pattern = r'errors: \{'
        replacement = legal_type.strip() + '\n  errors: {'
        new_content = re.sub(pattern, replacement, content)

        if new_content != content:
            with open('types.ts', 'w') as f:
                f.write(new_content)
            print("Successfully updated types.ts")
        else:
            print("Could not find insertion point 'errors: {'")
    else:
        print("types.ts already contains legal section")

if __name__ == "__main__":
    update_types()
