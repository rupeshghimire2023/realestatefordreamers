import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <footer class="bg-slate-950 text-slate-300 py-16 border-t border-slate-900">
      <div class="container mx-auto px-6">
        
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          
          <!-- Brand Column -->
          <div class="col-span-1 md:col-span-2">
            <a routerLink="/" class="text-2xl font-serif font-bold tracking-tight flex items-center gap-2 mb-6 group w-fit">
              <div class="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-tr-xl rounded-bl-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <span class="text-xl">K</span>
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
              <span>Main Street Realty Group</span>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-wider">Explore</h4>
            <ul class="space-y-3 text-sm">
              <li><a (click)="onScrollTo('home')" class="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Home</a></li>
              <li><a (click)="onScrollTo('about')" class="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> About Kritika</a></li>
              <li><a routerLink="/portfolio" class="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Exclusive Portfolio</a></li>
              <li><a (click)="onScrollTo('buying')" class="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Services</a></li>
              <li><a (click)="onScrollTo('testimonials')" class="hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Client Stories</a></li>
            </ul>
          </div>

          <!-- Contact & Social -->
          <div>
            <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-wider">Connect</h4>
            <ul class="space-y-4 text-sm mb-8">
              <li class="flex items-start gap-3">
                <app-icon name="phone" class="w-5 h-5 text-amber-500 shrink-0"></app-icon>
                <a href="tel:+14706526362" class="hover:text-white transition-colors">(470) 652-6362</a>
              </li>
              <li class="flex items-start gap-3">
                <app-icon name="mail" class="w-5 h-5 text-amber-500 shrink-0"></app-icon>
                <a href="mailto:realestatefordreamers@gmail.com" class="hover:text-white transition-colors break-all">realestatefordreamers@gmail.com</a>
              </li>
              <li class="flex items-start gap-3">
                <app-icon name="map-pin" class="w-5 h-5 text-amber-500 shrink-0"></app-icon>
                <span>Serving All over Georgia</span>
              </li>
            </ul>

            <div class="flex gap-3">
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all transform hover:-translate-y-1">
                <app-icon name="instagram" class="w-5 h-5"></app-icon>
              </a>
              <a href="https://www.facebook.com/p/Real-Estate-for-Dreamers-100079074604797" target="_blank" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                <app-icon name="facebook" class="w-5 h-5"></app-icon>
              </a>
              <a href="https://www.tiktok.com" target="_blank"  class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 border border-slate-700 hover:border-white">
                <app-icon name="tiktok" class="w-5 h-5"></app-icon>
              </a>
            </div>
          </div>

        </div>

        <div class="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {{ currentYear }} Real Estate for Dreamers. All rights reserved.</p>
          <div class="flex gap-6 mt-4 md:mt-0">
            <!-- <a href="#" class="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-slate-300 transition-colors">Terms of Service</a> -->
            <span class="text-slate-700">|</span>
            <p>Designed with ❤️ for Real Estate for Dreamers</p>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  onScrollTo(elementId: string) {
    if (this.router.url === '/') {
      this.scrollTo(elementId);
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollTo(elementId), 100);
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