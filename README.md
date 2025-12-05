Real Estate for Dreamers 🏡✨

A professional, high-performance real estate web application built for Kritika Katwal, a top-producing realtor in Georgia. This application combines modern web architecture with AI-driven interactions to provide a seamless experience for home buyers and sellers.

🌟 Key Features

🤖 AI Real Estate Assistant: A floating chatbot powered by Google Gemini AI that answers questions about the Georgia market, buying processes, and specific services in real-time.

📊 Dynamic Portfolio: A "Master" listing system that handles three distinct property states:

Active: Full gallery, details, and tour scheduling.

Coming Soon: Teaser mode with blurred visuals and "Join Waitlist" CTA.

Sold: Success stories with "Price Over Asking" metrics and a "Get Home Value" calculator.

🧮 Interactive Mortgage Calculator: A real-time calculator allowing users to estimate monthly payments based on interest rates, down payments, and loan terms.

📝 Serverless Lead Generation: A custom contact form that bypasses traditional backends and saves leads directly to a Google Sheet via Google Apps Script.

📱 Fully Responsive: Mobile-first design using Tailwind CSS for a premium look on all devices.

☁️ Cloud Integration: Powered by Firebase Firestore for data management and Firebase Storage for high-resolution image hosting.

🛠️ Tech Stack

Frontend: Angular 17+ (Standalone Components, Signals)

Styling: Tailwind CSS

Database: Firebase Firestore & Storage

AI: Google Gemini API (1.5 Flash)

Integrations: Google Apps Script (Form Handling)

Hosting: Netlify

🚀 Getting Started

Prerequisites

Node.js v18 or higher

Angular CLI (npm install -g @angular/cli)

Installation

Clone the repository:

git clone [https://github.com/your-username/real-estate-dreamers.git](https://github.com/your-username/real-estate-dreamers.git)
cd real-estate-dreamers


Install dependencies:

npm install


Configure Environment Variables:
Create a file src/environments/environment.ts and add your keys:

export const environment = {
  production: false,
  geminiApiKey: 'YOUR_GEMINI_API_KEY',
  googleScriptUrl: 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL',
  firebaseConfig: {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  }
};


Run the development server:

ng serve


Navigate to http://localhost:4200/.

📂 Project Structure

We follow a modular Feature-First architecture for scalability:

src/app/
├── core/                 # Singletons (Data Services, Models, Global Layout)
│   ├── services/         # Logic for Firebase, AI, and Lead Gen
│   └── models/           # TypeScript Interfaces
├── features/             # Main Route Components
│   ├── home/             # Landing Page (split into sub-components)
│   ├── portfolio/        # Grid view of all properties
│   ├── listing-detail/   # Dynamic single property view
│   └── chatbot/          # Floating AI widget
└── shared/               # Reusable UI (Icons, Loaders)


🚢 Deployment

This project is optimized for deployment on Netlify.

Run the build command:

ng build


Deploy the dist/real-estate-dreamers/browser folder.

Important: Ensure you add a _redirects file in src/ containing /* /index.html 200 to handle Angular routing correctly on Netlify.

👤 Author

Rupesh Ghimire


Built with ❤️ for Georgia Real Estate.