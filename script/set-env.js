const fs = require('fs');
const path = require('path');

// 1. Define the path to the environment file
// We use path.resolve to ensure we are targeting the correct absolute path
const targetPath = path.resolve(__dirname, '../src/environments/environment.ts');
const environmentsDir = path.dirname(targetPath);

// 2. Ensure the directory exists
if (!fs.existsSync(environmentsDir)) {
  fs.mkdirSync(environmentsDir, { recursive: true });
}

// 3. Construct the file content from Netlify Environment Variables
// JSON.stringify safely wraps strings in quotes and escapes characters
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

// 4. Write the file
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error('Error writing environment file:', err);
    process.exit(1);
  }
  console.log(`Output generated at ${targetPath}`);
});