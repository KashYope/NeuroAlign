import re

file_path = 'types.ts'

with open(file_path, 'r') as f:
    content = f.read()

# Add FeedbackCategory enum
if 'enum FeedbackCategory' not in content:
    enum_def = """
export enum FeedbackCategory {
  ASSESSMENT = 'assessment',
  ONBOARDING = 'onboarding',
  SAVING = 'saving',
  REPORT = 'report',
  PDF = 'pdf',
  IMPORT = 'import',
  ACCURACY = 'accuracy'
}
"""
    # Insert after Phase enum
    content = re.sub(r'(export enum Phase \{[^}]+\})', r'\1' + enum_def, content)

# Update Translation interface
if 'feedback: {' not in content:
    translation_field = """
  feedback: {
    title: string;
    subtitle: string;
    categories: Record<string, string>;
    labels: {
      poor: string;
      excellent: string;
      didNotUse: string;
      pros: string;
      cons: string;
      suggestions: string;
      send: string;
      close: string;
    };
    placeholders: {
      pros: string;
      cons: string;
      suggestions: string;
    };
  };
"""
    # Insert into Translation interface, maybe before 'errors:'
    content = re.sub(r'(errors: \{)', translation_field + r'\1', content)

with open(file_path, 'w') as f:
    f.write(content)

print("types.ts updated")
