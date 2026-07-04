# Gov-Match: AI-Driven Government Scheme Matching Portal

![Project Logo](https://img.shields.io/badge/Government-India-orange?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_Vite_|_Tailwind-blue?style=for-the-badge)

Gov-Match is a modern, professional web portal designed to help citizens find and apply for relevant government welfare schemes. Using advanced logic and a multilingual interface, it simplifies the complex landscape of center and state programs.

## 🚀 Key Features

- **AI-Driven Matching**: Analyzes applicant profiles to calculate matching confidence scores.
- **Explainable AI (XAI)**: Provides clear, logical reasons for eligibility results.
- **Multilingual Support**: Fully localized in **English (EN)**, **Hindi (HI)**, and **Kannada (KN)**.
- **Official PDF Generation**: Generate and download personalized eligibility reports in an official format.
- **State Integration**: Cross-references profiles with multiple state and central databases.
- **Modern UI**: Built with a premium government aesthetic using Tailwind CSS and Framer Motion.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 8
- **Styling**: Tailwind CSS (Government Design System)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Localization**: i18next
- **PDF Generation**: jsPDF & autoTable

## 📂 Project Structure

```bash
src/
├── components/     # Reusable UI components (Navbar, Footer, SchemeCard, etc.)
├── pages/          # Main application screens (Home, Form, Results, Explanation)
├── services/       # Core logic, matching engine, and API services
├── i18n.js         # Multilingual configuration
└── index.css       # Core design tokens and global styles
```

## 🚥 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nischiths07/mp-frontend-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## 📖 How it Works

1. **Profile Input**: User enters demographic and economic details (Age, Income, Occupation, State).
2. **Matching Engine**: The system filters `schemeData.js` based on official eligibility rules.
3. **Results**: A prioritized list of schemes is presented with matching percentages.
4. **Explanation**: Users can click "Reasoning" to see why they qualify for a specific program.
5. **PDF Report**: Generate a "Personalized Scheme Eligibility Report" for offline use.

---

*This is a Digital India Initiative prototype.*
