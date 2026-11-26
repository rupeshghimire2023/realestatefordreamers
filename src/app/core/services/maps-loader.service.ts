import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Loads the Google Maps JavaScript API (with Places) on demand, once per page,
 * so pages that never show an address field don't pay for the script.
 */
@Injectable({ providedIn: 'root' })
export class MapsLoaderService {
  private loading?: Promise<void>;

  load(): Promise<void> {
    if ((window as any).google?.maps?.places) return Promise.resolve();
    if (this.loading) return this.loading;

    const key = environment.googleMapsApiKey;
    if (!key) return Promise.reject(new Error('Google Maps API key is missing'));

    this.loading = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        this.loading = undefined; // allow a retry on the next call
        reject(new Error('Google Maps failed to load'));
      };
      document.head.appendChild(script);
    });
    return this.loading;
  }
}
