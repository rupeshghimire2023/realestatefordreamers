import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { ChatbotComponent } from './features/chatbot/chatbot.component';

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
export class AppComponent {}