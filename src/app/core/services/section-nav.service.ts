import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Scrolls to a section of the home page (about, buying, testimonials, contact...).
 * From another page it navigates home with the section as the URL fragment and
 * lets the router's anchor scrolling (enabled in app.config.ts) do the scroll
 * once the page has rendered. The section ids are on wrappers in
 * home.component.html, so they exist before the deferred sections load.
 */
@Injectable({ providedIn: 'root' })
export class SectionNavService {
  private router = inject(Router);

  goTo(sectionId: string) {
    if (this.isOnHome()) {
      this.scrollTo(sectionId);
    } else {
      this.router.navigate(['/'], sectionId === 'home' ? {} : { fragment: sectionId });
    }
  }

  scrollTo(sectionId: string) {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  isOnHome(): boolean {
    return this.router.url.split(/[?#]/)[0] === '/';
  }
}
