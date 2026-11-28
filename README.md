Real Estate for Dreamers 🏡✨

A professional, high-performance real estate web application built for Kritika Katwal, a top-producing realtor in Georgia. This application combines modern web architecture with AI-driven interactions to provide a seamless experience for home buyers and sellers.

🌟 Key Features

🤖 AI Real Estate Assistant: A floating chat assistant that answers questions about buying, selling and the site's services. It runs on a free AI model (Groq by default; any OpenAI-compatible provider works), is clearly labeled as an AI assistant rather than the realtor, and follows fair-housing guardrails. If the AI is unavailable or its free quota runs out, it answers from a built-in FAQ.

📧 Agentic Email Automation: A sophisticated backend workflow running on Google Apps Script that acts as an intelligent agent.

Intent Analysis: Automatically detects if a lead is a Buyer or Seller.

Personalized Response: Uses Gemini AI to write a warm, context-aware email response.

Resource Delivery: Automatically attaches (or provides a direct download link to) the appropriate Buyer's Guide or Seller's Roadmap based on the user's specific needs.

📊 Dynamic Portfolio: A "Master" listing system that handles three distinct property states:

Active: Full gallery, details, and tour scheduling.

Coming Soon: Teaser mode with blurred visuals and "Join Waitlist" CTA.

Sold: Success stories with "Price Over Asking" metrics and a "Get Home Value" calculator.

🧮 Interactive Mortgage Calculator: A real-time calculator allowing users to estimate monthly payments based on interest rates, down payments, and loan terms.

📝 Serverless Lead Generation: The contact and valuation forms save each lead to Firestore and send it through a rate-limited Netlify Function (/api/lead) to Google Apps Script, which writes the Google Sheet and sends the email. A hidden spam-trap field filters out form bots.

📱 Fully Responsive: Mobile-first design using Tailwind CSS for a premium look on all devices.

☁️ Cloud Integration: Powered by Firebase Firestore for data management and Firebase Storage for high-resolution image hosting.

🛠️ Tech Stack

Frontend: Angular 21 (Standalone Components, Signals, zoneless)

Styling: Tailwind CSS

Database: Firebase Firestore & Storage (security rules in firestore.rules / storage.rules)

AI: any OpenAI-compatible chat API (default: Groq free tier, openai/gpt-oss-20b) via a Netlify Function (netlify/functions/chat.mts)

Integrations: Google Apps Script via netlify/functions/lead.mts (Form Handling & Agentic Workflows), Google Maps Places (address autocomplete)

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

Navigate to http://localhost:4200/. The chat (/api/chat) and lead (/api/lead) endpoints are Netlify Functions, so they only run on Netlify or locally under `netlify dev` (Netlify CLI), with the server-side variables below in a local .env file. Under plain `ng serve` the chat replies with an offline message and leads are only saved to Firestore.

Realtor details (name, photos, phone, email, socials, Top Producer years, hero text and About bio) live in one place: src/app/core/config/realtor-data.ts. Leave a social network out to hide its icon. The chat assistant reads its contact details from the same file.

Blog posts (Firestore `blog_posts`) are written in Markdown; plain text with line breaks works too.

☁️ Deployment (Netlify)

Netlify runs `npm run build:netlify` (set in netlify.toml), which runs set-env.js to generate environment.ts from these Netlify environment variables, then builds. Locally, `npm run build` just builds with your own environment.ts (don't run `build:netlify` locally: it overwrites that file).

Public (written into the browser bundle by set-env.js):
- GOOGLE_MAPS_API_KEY (restrict it to your domains under HTTP referrers in Google Cloud)
- FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_SENDER_ID, FIREBASE_APP_ID

Server-side only (read by the functions at runtime; mark them as "Contains secret values" in Netlify so secret scanning fails any build that leaks them):
- CHAT_API_KEY: your AI provider key (e.g. a free Groq key from console.groq.com). Without it the assistant answers from its FAQ.
- CHAT_API_URL (optional): OpenAI-compatible chat completions URL. Defaults to Groq.
- CHAT_MODEL (optional): defaults to openai/gpt-oss-20b. Check your provider's current model list.
- CHAT_REASONING_EFFORT (optional): "low" by default for gpt-oss models; set to an empty value for providers that don't support it.
- GOOGLE_SCRIPT_URL: the Apps Script web app URL that receives leads.

Never put a secret in set-env.js or environment.ts: everything there ships to every visitor.

🔒 Firebase Security Rules

Deploy the rules with the Firebase CLI:

npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,storage

Visitors can read listings, testimonials and blog posts, and can only create leads and page-view logs. Leads cannot be read from the browser. Manage content in the Firebase console, which bypasses the rules.

🛡️ Abuse protection

- /api/chat and /api/lead accept only same-site POST requests and are rate limited per visitor IP (10 and 5 requests a minute, set in each function's config).
- Lead forms include a hidden spam-trap field; submissions that fill it in are dropped.
- Keep the AI provider account on its free tier with no card attached, so heavy use can never cost money: the assistant just falls back to its FAQ.

🧪 Tests

npx ng test                 # Angular app
npm run test:functions      # Netlify functions (type-check + tests)


👤 Author

Rupesh Ghimire

Built with ❤️ for Real Estate for Dreamers.
