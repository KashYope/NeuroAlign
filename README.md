# NeuroAlign: Adult Neurodiversity Screening

A unified, scientifically-grounded assessment framework designed to explore the **"Spiky Profile"** of adult neurodivergence. NeuroAlign integrates several clinical frameworks into a single, cohesive experience, prioritizing lived experience and functional costs over external behavioral observation.

## ✨ Premium Features

### 🏁 Dual Assessment Modes
- **Marathon Mode**: Complete the full, comprehensive screening (~140 questions) in one seated session. Includes guided "Break Moments" to manage cognitive load.
- **Module by Module**: Focus on specific profiles (ADHD, Autism, Dyslexia, etc.) at your own pace. Progress is automatically saved between modules.

### 🧠 Comprehensive Screening
Covers 5 core neurodevelopmental domains with adapted clinical instruments:
- **ADHD**: Executive function, attention regulation, and impulse control (Adapted from ASRS v1.1).
- **Autism**: Internal experience, masking, and social compensation (Adapted from CAT-Q).
- **Dyslexia**: Phonological processing, visual-spatial sequencing, and memory (Vinegrad).
- **Dyspraxia (DCD)**: Motor coordination, planning, and executive-action gap (Adult ADC).
- **Dyscalculia**: Number sense, arithmetic logic, and subitizing ability (Steve Chinn).

### 📊 The "Spiky Profile" Visualization
- **Dynamic Radar Charts**: Visualize your unique cognitive peaks and dips instead of binary "high/low" labels.
- **Co-occurrence Mapping**: Automatically identifies patterns where traits overlap (e.g., the AuDHD signature).

### 🎨 Human-Centric UX
- **🌓 Adaptive Themes**: Seamlessly switches between Light and Dark modes based on system preferences with a manual override.
- **🔀 Shuffled Questions**: Questions are randomized using a persistent seed, ensuring each session feels fresh while maintaining progress integrity.
- **🦄 Vibe Coding & Effects**: Interactive mouse effects (hearts, sparkles, etc.) and "Dopamine Rewards" (ADHD-friendly micro-animations) for an engaging experience.
- **📱 Mobile-Optimized**: Custom-built horizontal Likert scales to reduce scrolling fatigue on small screens.

### 🔒 Privacy & Portability
- **Privacy First**: All assessment data runs locally in your browser. No personal data ever leaves your device.
- **📲 QR Export/Import**: Generate a secure QR code from your report to transfer or restore your results on another device without using a database.
- **📄 PDF Reports**: Download a detailed, formatted report of your findings for personal use or clinical consultation.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (Vibrant dark mode support)
- **Visualization**: [Chart.js](https://www.chartjs.org/) / `react-chartjs-2`
- **PDF Generation**: `jsPDF` + `jspdf-autotable`
- **Scanning**: `html5-qrcode` & `qrcode` for report portability
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher

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

3. Launch development server:
   ```bash
   npm run dev
   ```

## 📖 Scientific Methodology

NeuroAlign adopts a **Biopsychosocial model**, acknowledging that neurodivergence is an interaction between biological differences and environmental barriers. By prioritizing the *internal cost* of performance (masking, sensory load, executive fatigue), we provide a more accurate picture of adult neurodivergent life.

---
*Vibe coded with ❤️ for the neurodivergent community.*
