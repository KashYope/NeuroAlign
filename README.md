# NeuroAlign: Adult Neurodiversity Screening

A unified, scientifically-grounded assessment framework designed to explore the "Spiky Profile" of adult neurodivergence. This application covers ADHD, Autism, Dyslexia, Dyspraxia, and Dyscalculia, emphasizing lived experience and functional costs over external behavioral observation.

## Features

- **Multi-Module Assessment**: Comprehensive screening for 5 key neurotypes:
  - **ADHD**: Executive function, attention, and regulation (ASRS v1.1 inspired).
  - **Autism**: Masking, camouflage, and social compensation (CAT-Q inspired).
  - **Dyslexia**: Phonological processing and memory (Vinegrad).
  - **Dyspraxia**: Motor coordination and planning (ADC).
  - **Dyscalculia**: Number sense and arithmetic (Steve Chinn).

- **The "Spiky Profile" Visualization**:
  - Moves away from simple "high/low" functioning labels.
  - Visualizes strengths and specific challenges across different domains using dynamic radar charts.

- **Detailed Reporting**:
  - Generates a PDF report summarizing scores, likelihoods, and granular insights.
  - Provides actionable "Next Steps" and accommodation suggestions.

- **Transparent Methodology**:
  - Dedicated **"Methods & Science"** page explaining the clinical rationale behind each module.
  - Full citations for all adapted instruments (ASRS, CAT-Q, etc.).

- **Mobile-First UX**:
  - Fully responsive design with touch-optimized interfaces.
  - **Horizontal Likert Scale** adapted for all screen sizes to prevent scrolling fatigue.

- **Bilingual Support**: Fully localized in English and French.

- **Privacy First**: All assessment data runs locally in your browser. No personal data is stored or transmitted.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd neuroalign
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Visualization**: Chart.js / React-Chartjs-2
- **PDF Generation**: jsPDF + AutoTable (via ESM)
- **Icons**: Lucide React
- **Internationalization**: Custom i18n solution

## Scientific Methodology

NeuroAlign adopts a **Biopsychosocial model**, acknowledging that neurodivergence is an interaction between biological differences and environmental barriers. It prioritizes the *internal cost* of maintaining performance (e.g., masking, fatigue) rather than just the visible output.
