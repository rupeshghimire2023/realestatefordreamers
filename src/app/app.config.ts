import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  provideFirestore
} from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // Scroll to top on navigation
        anchorScrolling: 'enabled'        // Scroll to #fragment (used by SectionNavService)
      })
    ),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Offline cache (IndexedDB), shared across open tabs
    provideFirestore(() =>
      initializeFirestore(getApp(), {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      })
    )
  ]
};
