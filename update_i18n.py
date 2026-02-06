import re

def update_i18n():
    with open('i18n.ts', 'r') as f:
        content = f.read()

    en_legal = """
    legal: {
      title: "Legal & Privacy",
      backBtn: "Back to Home",
      mentions: {
        title: "Legal Mentions",
        editor: "Editor: Kevin Kash Hauzeur",
        hosting: "Hosting: Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA",
        contact: "Contact: cestmoikash+neuroalign@gmail.com",
        address: "Address: 1020 Brussels, Belgium"
      },
      privacy: {
        title: "Privacy Policy",
        intro: "We prioritize your privacy through a 'Privacy by Design' architecture.",
        localProcessing: {
          title: "Local Processing",
          text: "All assessment data is processed exclusively in your browser. No personal data is sent to any server. Your answers remain on your device."
        },
        noDatabase: {
          title: "No Database",
          text: "We do not maintain a database of user responses. We cannot see, access, or recover your data."
        },
        rights: {
          title: "Your Rights",
          text: "Since we do not hold your data, you possess full control. You can delete your data by clearing your browser cache."
        }
      },
      terms: {
        title: "Terms of Use",
        disclaimer: {
          title: "Not a Diagnosis",
          text: "NeuroAlign is a screening tool for educational purposes only. It does not provide a medical diagnosis."
        },
        usage: {
          title: "Usage",
          text: "By using this tool, you acknowledge that results are indicative and should be discussed with a healthcare professional."
        }
      },
      footerLink: "CGU & Privacy"
    },"""

    fr_legal = """
    legal: {
      title: "Mentions Légales & Vie Privée",
      backBtn: "Retour à l'accueil",
      mentions: {
        title: "Mentions Légales",
        editor: "Éditeur : Kevin Kash Hauzeur",
        hosting: "Hébergement : Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA",
        contact: "Contact : cestmoikash+neuroalign@gmail.com",
        address: "Adresse : 1020 Bruxelles, Belgique"
      },
      privacy: {
        title: "Politique de Confidentialité",
        intro: "Nous priorisons votre confidentialité via une architecture 'Privacy by Design'.",
        localProcessing: {
          title: "Traitement Local",
          text: "Toutes les données de l'évaluation sont traitées exclusivement dans votre navigateur. Aucune donnée personnelle n'est envoyée à un serveur."
        },
        noDatabase: {
          title: "Pas de Base de Données",
          text: "Nous ne maintenons aucune base de données de réponses. Nous ne pouvons ni voir, ni accéder, ni récupérer vos données."
        },
        rights: {
          title: "Vos Droits",
          text: "Puisque nous ne détenons pas vos données, vous en avez le contrôle total. Vous pouvez les supprimer en vidant le cache de votre navigateur."
        }
      },
      terms: {
        title: "Conditions Générales d'Utilisation (CGU)",
        disclaimer: {
          title: "Pas un Diagnostic",
          text: "NeuroAlign est un outil de dépistage à but éducatif uniquement. Il ne fournit pas de diagnostic médical."
        },
        usage: {
          title: "Utilisation",
          text: "En utilisant cet outil, vous reconnaissez que les résultats sont indicatifs et doivent être discutés avec un professionnel de santé."
        }
      },
      footerLink: "CGU & Vie Privée"
    },"""

    # Replace for English (first occurrence)
    pattern_en = r'errors: \{\s*scoring: "Scoring error'
    replacement_en = en_legal.strip() + '\n    errors: {\n      scoring: "Scoring error'
    new_content = re.sub(pattern_en, replacement_en, content, count=1)

    # Replace for French (second occurrence, but now first occurrence of French text)
    pattern_fr = r'errors: \{\s*scoring: "Erreur de calcul'
    replacement_fr = fr_legal.strip() + '\n    errors: {\n      scoring: "Erreur de calcul'
    new_content = re.sub(pattern_fr, replacement_fr, new_content, count=1)

    if new_content != content:
        with open('i18n.ts', 'w') as f:
            f.write(new_content)
        print("Successfully updated i18n.ts")
    else:
        print("Could not find insertion points in i18n.ts")

if __name__ == "__main__":
    update_i18n()
