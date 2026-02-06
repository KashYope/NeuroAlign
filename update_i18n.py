import re

file_path = 'i18n.ts'

en_feedback = """
    feedback: {
      title: "We value your feedback",
      subtitle: "Help us improve NeuroAlign",
      categories: {
        assessment: "Assessment Process",
        onboarding: "Onboarding",
        saving: "Saving Progress",
        report: "Report Clarity",
        pdf: "PDF Generation",
        import: "Import Function",
        accuracy: "Result Accuracy"
      },
      labels: {
        poor: "Poor",
        excellent: "Excellent",
        didNotUse: "Did not use / N/A",
        pros: "Pros",
        cons: "Cons",
        suggestions: "Suggestions",
        send: "Send Feedback",
        close: "Close"
      },
      placeholders: {
        pros: "What did you like?",
        cons: "What could be better?",
        suggestions: "Any feature requests?"
      }
    },
"""

fr_feedback = """
    feedback: {
      title: "Votre avis compte",
      subtitle: "Aidez-nous à améliorer NeuroAlign",
      categories: {
        assessment: "Processus d'évaluation",
        onboarding: "Intégration / Accueil",
        saving: "Sauvegarde de la progression",
        report: "Clarté du rapport",
        pdf: "Génération PDF",
        import: "Fonction d'import",
        accuracy: "Précision des résultats"
      },
      labels: {
        poor: "Mauvais",
        excellent: "Excellent",
        didNotUse: "Non utilisé / N/A",
        pros: "Points forts",
        cons: "Points faibles",
        suggestions: "Suggestions",
        send: "Envoyer l'avis",
        close: "Fermer"
      },
      placeholders: {
        pros: "Qu'avez-vous apprécié ?",
        cons: "Qu'est-ce qui pourrait être amélioré ?",
        suggestions: "Des idées de fonctionnalités ?"
      }
    },
"""

with open(file_path, 'r') as f:
    content = f.read()

# Replace first occurrence (en)
content = content.replace('faqTitle: "Frequently Asked Questions",', en_feedback + '    faqTitle: "Frequently Asked Questions",', 1)

# Replace second occurrence (fr)
content = content.replace('faqTitle: "Questions Fréquemment Posées",', fr_feedback + '    faqTitle: "Questions Fréquemment Posées",', 1)

with open(file_path, 'w') as f:
    f.write(content)

print("i18n.ts updated")
