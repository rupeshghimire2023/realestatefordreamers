import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ConfigService } from '../../services/config.service';
import { SectionNavService } from '../../services/section-nav.service';

/** A nav entry either scrolls to a home-page section or routes to a page. */
interface NavItem {
  label: string;
  section?: string;
  route?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <nav class="fixed w-full z-40 transition-all duration-300" 
         [ngClass]="{'bg-white/95 shadow-lg backdrop-blur-sm py-2': isScrolled(), 'bg-transparent py-6': !isScrolled()}">
      <div class="container mx-auto px-6 flex justify-between items-center">
        
        <!-- Logo -->
        <a routerLink="/" (click)="onLogoClick()" class="text-2xl md:text-3xl font-serif font-bold tracking-tight flex items-center gap-3 group cursor-pointer">
          <img [src]="cfg.branding.logoMark" alt="" class="h-10 md:h-12 w-auto shrink-0 group-hover:scale-105 transition-transform">
          <span [ngClass]="{'text-slate-800': isScrolled(), 'text-white': !isScrolled(), 'text-slate-900': isMobileMenuOpen()}">
            Real Estate <span class="text-brand-600">for Dreamers</span>
          </span>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <ng-container *ngFor="let item of navItems">
            <a *ngIf="item.route; else sectionLink" [routerLink]="item.route"
               class="cursor-pointer font-medium hover:text-brand-600 transition-colors"
               [ngClass]="{'text-slate-600': isScrolled(), 'text-white/90 hover:text-white': !isScrolled()}">
              {{ item.label }}
            </a>
            <ng-template #sectionLink>
              <button type="button" (click)="goToSection(item.section!)"
                      class="cursor-pointer font-medium hover:text-brand-600 transition-colors"
                      [ngClass]="{'text-slate-600': isScrolled(), 'text-white/90 hover:text-white': !isScrolled()}">
                {{ item.label }}
              </button>
            </ng-template>
          </ng-container>
          
          <button type="button" (click)="goToSection('contact')" 
                  class="px-6 py-2.5 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                  [ngClass]="{'bg-brand-600 text-white hover:bg-brand-700': isScrolled(), 'bg-white text-slate-900 hover:bg-slate-100': !isScrolled()}">
            Let's Talk
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button type="button" class="md:hidden p-2 rounded-lg transition-colors"
                (click)="toggleMenu()"
                [attr.aria-label]="isMobileMenuOpen() ? 'Close menu' : 'Open menu'"
                [attr.aria-expanded]="isMobileMenuOpen()"
                aria-controls="mobile-menu"
                [ngClass]="{'text-slate-800 hover:bg-slate-100': isScrolled() || isMobileMenuOpen(), 'text-white hover:bg-white/10': !isScrolled() && !isMobileMenuOpen()}">
          <app-icon [name]="isMobileMenuOpen() ? 'x' : 'menu'"></app-icon>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <div *ngIf="isMobileMenuOpen()" id="mobile-menu" class="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-4 px-6 md:hidden flex flex-col space-y-4 animate-slideDown">
        <ng-container *ngFor="let item of navItems">
          <a *ngIf="item.route; else mobileSectionLink" [routerLink]="item.route" (click)="closeMenu()"
             class="text-left text-lg font-medium text-slate-600 hover:text-brand-600 py-2 border-b border-slate-50">
            {{ item.label }}
          </a>
          <ng-template #mobileSectionLink>
            <button type="button" (click)="goToSection(item.section!)"
                    class="text-left text-lg font-medium text-slate-600 hover:text-brand-600 py-2 border-b border-slate-50">
              {{ item.label }}
            </button>
          </ng-template>
        </ng-container>
        <button type="button" (click)="goToSection('contact')" class="w-full bg-brand-600 text-white py-3 rounded-lg font-semibold shadow-md active:scale-95 transition-transform">
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
  protected cfg = inject(ConfigService).config();
  private sectionNav = inject(SectionNavService);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Home', section: 'home' },
    { label: 'About', section: 'about' },
    { label: 'Portfolio', route: '/portfolio' },
    { label: 'Services', section: 'buying' },
    { label: 'Blog', route: '/blog' },
    { label: 'Stories', section: 'testimonials' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }

  // routerLink handles other pages; on the home page it would do nothing, so scroll up instead.
  onLogoClick() {
    this.closeMenu();
    if (this.sectionNav.isOnHome()) this.sectionNav.scrollTo('home');
  }

  goToSection(sectionId: string) {
    this.closeMenu();
    this.sectionNav.goTo(sectionId);
  }
}
