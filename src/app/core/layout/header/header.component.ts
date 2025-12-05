import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <nav class="fixed w-full z-40 transition-all duration-300" 
         [ngClass]="{'bg-white/95 shadow-lg backdrop-blur-sm py-2': isScrolled(), 'bg-transparent py-6': !isScrolled()}">
      <div class="container mx-auto px-6 flex justify-between items-center">
        
        <!-- Logo -->
        <a routerLink="/" class="text-2xl md:text-3xl font-serif font-bold tracking-tight flex items-center gap-2 group cursor-pointer">
          <div class="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-tr-xl rounded-bl-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
           <img src="https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Flogo.png?alt=media&token=068a9e22-31a3-4d4a-8fe2-c84c8929de4f" 
             />
          </div>
          <span [ngClass]="{'text-slate-800': isScrolled(), 'text-white': !isScrolled(), 'text-slate-900': isMobileMenuOpen()}">
            Real Estate <span class="text-amber-500">for Dreamers</span>
          </span>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <!-- CLEAN LOOP: No static <a> tags here, only the *ngFor -->
          <a *ngFor="let item of navItems" 
             (click)="handleNav(item)"
             class="cursor-pointer font-medium hover:text-amber-500 transition-colors"
             [ngClass]="{'text-slate-600': isScrolled(), 'text-white/90 hover:text-white': !isScrolled()}">
            {{ item.label }}
          </a>
          
          <button (click)="handleNav({action: 'scroll', target: 'contact'})" 
                  class="px-6 py-2.5 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                  [ngClass]="{'bg-amber-500 text-white hover:bg-amber-600': isScrolled(), 'bg-white text-slate-900 hover:bg-slate-100': !isScrolled()}">
            Let's Talk
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2 rounded-lg transition-colors"
                (click)="toggleMenu()"
                [ngClass]="{'text-slate-800 hover:bg-slate-100': isScrolled() || isMobileMenuOpen(), 'text-white hover:bg-white/10': !isScrolled() && !isMobileMenuOpen()}">
          <app-icon [name]="isMobileMenuOpen() ? 'x' : 'menu'"></app-icon>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <div *ngIf="isMobileMenuOpen()" class="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-4 px-6 md:hidden flex flex-col space-y-4 animate-slideDown">
        <a *ngFor="let item of navItems" 
           (click)="handleNav(item)" 
           class="text-lg font-medium text-slate-600 hover:text-amber-500 py-2 border-b border-slate-50 last:border-0">
          {{ item.label }}
        </a>
        <button (click)="handleNav({action: 'scroll', target: 'contact'})" class="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold shadow-md active:scale-95 transition-transform">
          Book Consultation
        </button>
      </div>
    </nav>
  `,
  styles: [`
    @keyframes slide-down {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slideDown { animation: slide-down 0.3s ease-out forwards; }
  `]
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  // Ensuring the list is clean
  navItems = [
    { label: 'Home', action: 'scroll', target: 'home' },
    { label: 'About', action: 'scroll', target: 'about' },
    { label: 'Portfolio', action: 'route', target: '/portfolio' }, // Links to the full portfolio page
    { label: 'Services', action: 'scroll', target: 'buying' },
    { label: 'Stories', action: 'scroll', target: 'testimonials' }
  ];

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  handleNav(item: any) {
    this.isMobileMenuOpen.set(false);
    
    // 1. Handle External Route (Portfolio)
    if (item.action === 'route') {
      this.router.navigate([item.target]);
      return;
    }

    // 2. Handle Scroll Targets
    if (this.router.url === '/') {
      this.scrollTo(item.target);
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollTo(item.target), 100);
      });
    }
  }

  private scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}