import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ConfigService } from '../../services/config.service';
import { SectionNavService } from '../../services/section-nav.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <footer class="bg-slate-950 text-slate-300 py-16 border-t border-slate-900">
      <div class="container mx-auto px-6">
        
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          
          <!-- Brand Column -->
          <div class="col-span-1 md:col-span-2">
            <a routerLink="/" class="text-2xl font-serif font-bold tracking-tight flex items-center gap-2 mb-6 group w-fit">
              <div class="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-tr-xl rounded-bl-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <span class="text-xl">{{ cfg.branding.logoInitial }}</span>
              </div>
              <span class="text-white">
                Real Estate <span class="text-amber-500">for Dreamers</span>
              </span>
            </a>
            <p class="max-w-sm text-slate-400 leading-relaxed mb-6">
              Guiding you through every step of your real estate journey in Georgia. 
              Whether buying your first home or selling a luxury estate, experience the difference of a Top Producer.
            </p>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              <span>{{ cfg.realtor.brokerage }}</span>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-wider">Explore</h4>
            <ul class="space-y-3 text-sm">
              <li><button type="button" (click)="goToSection('home')" class="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Home</button></li>
              <li><button type="button" (click)="goToSection('about')" class="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> About {{ cfg.realtor.firstName }}</button></li>
              <li><a routerLink="/portfolio" class="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Exclusive Portfolio</a></li>
              <li><button type="button" (click)="goToSection('buying')" class="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Services</button></li>
              <li><button type="button" (click)="goToSection('testimonials')" class="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Client Stories</button></li>
            </ul>
          </div>

          <!-- Contact & Social -->
          <div>
            <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-wider">Connect</h4>
            <ul class="space-y-4 text-sm mb-8">
              <li class="flex items-start gap-3">
                <app-icon name="phone" class="w-5 h-5 text-amber-500 shrink-0"></app-icon>
                <a [href]="'tel:' + cfg.realtor.phone" class="hover:text-white transition-colors">{{ cfg.realtor.phoneDisplay }}</a>
              </li>
              <li class="flex items-start gap-3">
                <app-icon name="mail" class="w-5 h-5 text-amber-500 shrink-0"></app-icon>
                <a [href]="'mailto:' + cfg.realtor.email" class="hover:text-white transition-colors break-all">{{ cfg.realtor.email }}</a>
              </li>
              <li class="flex items-start gap-3">
                <app-icon name="map-pin" class="w-5 h-5 text-amber-500 shrink-0"></app-icon>
                <span>Serving All over Georgia</span>
              </li>
            </ul>

            <div class="flex gap-3">
              <a *ngIf="cfg.socials.instagram" [href]="cfg.socials.instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                 class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all transform hover:-translate-y-1">
                <app-icon name="instagram" class="w-5 h-5"></app-icon>
              </a>
              <a *ngIf="cfg.socials.facebook" [href]="cfg.socials.facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                <app-icon name="facebook" class="w-5 h-5"></app-icon>
              </a>
              <a *ngIf="cfg.socials.linkedin" [href]="cfg.socials.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                 class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-700 hover:text-white transition-all transform hover:-translate-y-1">
                <app-icon name="linkedin" class="w-5 h-5"></app-icon>
              </a>
              <a *ngIf="cfg.socials.tiktok" [href]="cfg.socials.tiktok" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                 class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 border border-slate-700 hover:border-white">
                <app-icon name="tiktok" class="w-5 h-5"></app-icon>
              </a>
            </div>
          </div>

        </div>

        <div class="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {{ currentYear }} {{ cfg.branding.websiteName }}. All rights reserved.</p>
          <div class="flex gap-6 mt-4 md:mt-0">
            <span class="text-slate-700">|</span>
            <p>Designed and built by <a href="https://relaunchable.us" target="_blank" rel="noopener noreferrer">Relaunchable</a> for {{ cfg.branding.websiteName }}</p>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  protected cfg = inject(ConfigService).config();
  private sectionNav = inject(SectionNavService);

  currentYear = new Date().getFullYear();

  goToSection(sectionId: string) {
    this.sectionNav.goTo(sectionId);
  }
}
