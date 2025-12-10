import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { ChatbotComponent } from './features/chatbot/chatbot.component';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatbotComponent],
  template: `
    <!-- Global Header -->
    <app-header></app-header>

    <!-- Page Content (Home, etc.) -->
    <router-outlet></router-outlet>
    
    <!-- Global Footer -->
    <app-footer></app-footer>

    <!-- Global Chatbot -->
    <app-chatbot></app-chatbot>
  `
})
export class AppComponent implements OnInit {
  
  // 1. Inject Router and Firestore in the constructor
  constructor(private router: Router, private firestore: Firestore) {}

  // 2. Set up the listener when the component starts
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Logic to run when navigation finishes
      this.logPageView(event.urlAfterRedirects);
    });
  }

  // 3. Helper function to send data to Firebase
  async logPageView(url: string) {
    // Define the collection reference
    const analyticsCollection = collection(this.firestore, 'analytics_logs');

    try {
      await addDoc(analyticsCollection, {
        page: url,
        timestamp: new Date().toISOString(), // Use ISO string for better compatibility
        device: this.isMobile() ? 'Mobile' : 'Desktop',
        userAgent: navigator.userAgent // Optional: store exact browser info
      });
      console.log('Analytics logged for:', url);
    } catch (e) {
      console.error('Error logging analytics:', e);
    }
  }

  // 4. Helper to detect mobile devices
  isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}