import { Injectable, signal } from '@angular/core';
import { SiteConfig } from '../models/config.model';
import { REALTOR_DATA } from '../config/realtor-data';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  config = signal<SiteConfig>(REALTOR_DATA);

  constructor() {
    this.applyTheme();
  }

  private applyTheme() {
    const theme = this.config().theme;
    const root = document.documentElement;

    // Write CSS Variables to the DOM
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--color-accent', theme.accentColor);
  }
}