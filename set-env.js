// Generates src/environments/environment.ts from Netlify environment variables.
// Run by `npm run build:netlify` (see netlify.toml); don't run it locally, it
// overwrites your own environment.ts.
//
// Everything written here ends up in the browser bundle, so only values that are
// safe to be public belong here. Server-side secrets (CHAT_API_KEY,
// GOOGLE_SCRIPT_URL) are read by the Netlify functions at runtime instead.
const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, './src/environments/environment.ts');
fs.mkdirSync(path.dirname(targetPath), { recursive: true });

const env = name => JSON.stringify(process.env[name] || '');

const envConfigFile = `
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: ${env('FIREBASE_API_KEY')},
    authDomain: ${env('FIREBASE_AUTH_DOMAIN')},
    projectId: ${env('FIREBASE_PROJECT_ID')},
    storageBucket: ${env('FIREBASE_STORAGE_BUCKET')},
    messagingSenderId: ${env('FIREBASE_SENDER_ID')},
    appId: ${env('FIREBASE_APP_ID')}
  }
};
`;

try {
  fs.writeFileSync(targetPath, envConfigFile);
  console.log(`✅ Output generated at ${targetPath}`);
} catch (err) {
  console.error('❌ Error writing environment file:', err);
  process.exit(1);
}
