import { Injectable, signal } from '@angular/core';
import { SiteConfig } from '../models/config.model';
import { REALTOR_DATA } from '../config/realtor-data';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  readonly config = signal<SiteConfig>(REALTOR_DATA).asReadonly();

  /** "Portfolio | Real Estate for Dreamers" */
  pageTitle(page?: string): string {
    const site = this.config().branding.websiteName;
    return page ? `${page} | ${site}` : site;
  }
}
