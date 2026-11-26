Real Estate for Dreamers 🏡✨

A professional, high-performance real estate web application built for Kritika Katwal, a top-producing realtor in Georgia. This application combines modern web architecture with AI-driven interactions to provide a seamless experience for home buyers and sellers.

🌟 Key Features

🤖 AI Real Estate Assistant: A floating chatbot powered by Google Gemini AI that answers questions about the Georgia market, buying processes, and specific services in real-time. It is customized with a "Top Producer" persona.

📧 Agentic Email Automation: A sophisticated backend workflow running on Google Apps Script that acts as an intelligent agent.

Intent Analysis: Automatically detects if a lead is a Buyer or Seller.

Personalized Response: Uses Gemini AI to write a warm, context-aware email response.

Resource Delivery: Automatically attaches (or provides a direct download link to) the appropriate Buyer's Guide or Seller's Roadmap based on the user's specific needs.

📊 Dynamic Portfolio: A "Master" listing system that handles three distinct property states:

Active: Full gallery, details, and tour scheduling.

Coming Soon: Teaser mode with blurred visuals and "Join Waitlist" CTA.

Sold: Success stories with "Price Over Asking" metrics and a "Get Home Value" calculator.

🧮 Interactive Mortgage Calculator: A real-time calculator allowing users to estimate monthly payments based on interest rates, down payments, and loan terms.

📝 Serverless Lead Generation: A custom contact form that bypasses traditional backends and saves leads directly to a Google Sheet via Google Apps Script.

📱 Fully Responsive: Mobile-first design using Tailwind CSS for a premium look on all devices.

☁️ Cloud Integration: Powered by Firebase Firestore for data management and Firebase Storage for high-resolution image hosting.

🛠️ Tech Stack

Frontend: Angular 21 (Standalone Components, Signals, zoneless)

Styling: Tailwind CSS

Database: Firebase Firestore & Storage (security rules in firestore.rules / storage.rules)

AI: Google Gemini API (2.5 Flash-Lite) via a Netlify Function (netlify/functions/chat.js)

Integrations: Google Apps Script (Form Handling & Agentic Workflows), Google Maps Places (address autocomplete)

🚀 Getting Started

Prerequisites

Node.js v20 or higher

Installation

git clone https://github.com/your-username/real-estate-dreamers.git
cd real-estate-dreamers
npm install


Configure Environment Variables:
Copy src/environments/environment.example.ts to src/environments/environment.ts (git-ignored) and fill in your values.

Run the development server:

npx ng serve

Navigate to http://localhost:4200/. The chatbot calls /.netlify/functions/chat, so use `netlify dev` if you want to test it locally.

Realtor details (name, photos, phone, email, socials, Top Producer years, hero text and About bio) live in one place: src/app/core/config/realtor-data.ts. Leave a social network out to hide its icon. The chatbot persona in netlify/functions/chat.js repeats the contact details, so keep the two in sync.

Blog posts (Firestore `blog_posts`) are written in Markdown; plain text with line breaks works too.

☁️ Deployment (Netlify)

Netlify runs `npm run build:netlify` (set in netlify.toml), which runs set-env.js to generate environment.ts from these Netlify environment variables, then builds. Locally, `npm run build` just builds with your own environment.ts (don't run `build:netlify` locally: it overwrites that file).

GEMINI_API_KEY (used only by the chat function, never sent to the browser)
GOOGLE_MAPS_API_KEY (restrict it to your domains under HTTP referrers in Google Cloud)
GOOGLE_SCRIPT_URL
FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_SENDER_ID, FIREBASE_APP_ID

🔒 Firebase Security Rules

Deploy the rules with the Firebase CLI:

npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,storage

Visitors can read listings, testimonials and blog posts, and can only create leads and page-view logs. Leads cannot be read from the browser. Manage content in the Firebase console, which bypasses the rules.

🧪 Tests

npx ng test


👤 Author

Rupesh Ghimire

Built with ❤️ for Real Estate for Dreamers.
