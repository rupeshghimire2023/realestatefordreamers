import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { ChatbotComponent } from './features/chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatbotComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-chatbot></app-chatbot>
  `
})
export class AppComponent {
  private firestore = inject(Firestore);

  constructor() {
    // Log a page view after every navigation (see analytics_logs in firestore.rules).
    inject(Router).events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(event => this.logPageView(event.urlAfterRedirects));
  }

  private async logPageView(url: string) {
    try {
      await addDoc(collection(this.firestore, 'analytics_logs'), {
        page: url.slice(0, 500),
        timestamp: new Date().toISOString(),
        device: this.isMobile() ? 'Mobile' : 'Desktop',
        userAgent: navigator.userAgent.slice(0, 500)
      });
    } catch (e) {
      console.error('Error logging analytics:', e);
    }
  }

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
