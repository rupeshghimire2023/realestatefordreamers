import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Tests for the Netlify functions' shared code: `npm run test:functions`.
// (The Angular app's tests run separately with `ng test`.)
export default defineConfig({
  root: fileURLToPath(new URL('..', import.meta.url)),
  test: {
    include: ['netlify/**/*.test.mts'],
    environment: 'node'
  }
});
