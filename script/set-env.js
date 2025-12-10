const fs = require('fs');
const path = require('path');

// 1. Define the path to the environment file
const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
const environmentsDir = path.dirname(targetPath);

// 2. Ensure the directory exists
if (!fs.existsSync(environmentsDir)) {
  fs.mkdirSync(environmentsDir, { recursive: true });
}

// 3. Construct the file content from Netlify Environment Variables
const envConfigFile = `
export const environment = {
  production: true,
  geminiApiKey: '${process.env.GEMINI_API_KEY || ""}',
  googleScriptUrl: '${process.env.GOOGLE_SCRIPT_URL || ""}',
  firebaseConfig: {
    apiKey: "${process.env.FIREBASE_API_KEY || ""}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || ""}",
    projectId: "${process.env.FIREBASE_PROJECT_ID || ""}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || ""}",
    messagingSenderId: "${process.env.FIREBASE_SENDER_ID || ""}",
    appId: "${process.env.FIREBASE_APP_ID || ""}"
  }
};
`;

// 4. Write the file
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Output generated at ${targetPath}`);
});