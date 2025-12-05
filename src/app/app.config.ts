import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// IMPORT THESE:
import { getFirestore, provideFirestore, enableIndexedDbPersistence } from '@angular/fire/firestore'; 
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    
    // UPDATE THIS PROVIDER:
    provideFirestore(() => {
        const firestore = getFirestore();
        // Enable offline persistence (caches data for speed)
        enableIndexedDbPersistence(firestore);
        return firestore;
    }),
    
    provideStorage(() => getStorage())
  ]
};