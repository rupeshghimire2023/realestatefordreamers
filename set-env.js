const fs = require('fs');
const path = require('path');

// FIX: Changed from '../src' to './src' because the script is now in the root
const targetPath = path.resolve(__dirname, './src/environments/environment.ts');
const environmentsDir = path.dirname(targetPath);

// 2. Ensure directory exists
if (!fs.existsSync(environmentsDir)) {
  fs.mkdirSync(environmentsDir, { recursive: true });
}

// 3. Construct content
const envConfigFile = `
export const environment = {
  production: true,
  geminiApiKey: ${JSON.stringify(process.env.GEMINI_API_KEY || "")},
  googleScriptUrl: ${JSON.stringify(process.env.GOOGLE_SCRIPT_URL || "")},
  firebaseConfig: {
    apiKey: ${JSON.stringify(process.env.FIREBASE_API_KEY || "")},
    authDomain: ${JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN || "")},
    projectId: ${JSON.stringify(process.env.FIREBASE_PROJECT_ID || "")},
    storageBucket: ${JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET || "")},
    messagingSenderId: ${JSON.stringify(process.env.FIREBASE_SENDER_ID || "")},
    appId: ${JSON.stringify(process.env.FIREBASE_APP_ID || "")}
  }
};
`;

// 4. Write file SYNCHRONOUSLY
try {
  fs.writeFileSync(targetPath, envConfigFile);
  console.log(`✅ Output generated at ${targetPath}`);
} catch (err) {
  console.error('❌ Error writing environment file:', err);
  process.exit(1);
}