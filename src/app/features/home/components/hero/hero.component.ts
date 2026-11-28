import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ConfigService } from '../../../../core/services/config.service';
import { JourneyTarget } from '../../../../core/models/models';

@Component({
  selector: 'app-home-hero',
  imports: [CommonModule, IconComponent],
  template: `
    <header id="home" class="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      
      <!-- Background Video (muted + playsinline are required for autoplay; poster shows while it loads) -->
      <div class="absolute inset-0 z-0">
        <video 
          autoplay 
          loop 
          [muted]="true" 
          playsinline 
          preload="auto"
          aria-hidden="true"
          class="w-full h-full object-cover"
          [poster]="cfg.branding.heroImage"
          [src]="cfg.branding.heroVideo">
        </video>
        
        <!-- Dark Overlay (Critical for text readability) -->
        <div class="absolute inset-0 bg-slate-900/50"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10 text-center text-white mt-16">
        <p class="text-brand-400 font-medium tracking-widest uppercase mb-4 animate-fadeInUp">{{ cfg.content.heroTagline }}</p>
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight animate-fadeInUp delay-100">
          Find Your Place in the <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-brand-600">World</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fadeInUp delay-200">
          {{ cfg.content.heroSubtext }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp delay-300">
          <button type="button" (click)="startJourney.emit('services')" class="px-8 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-600/30 w-full sm:w-auto">
            Our Services
          </button>
          <button type="button" (click)="startJourney.emit('about')" class="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-all w-full sm:w-auto">
            Learn More
          </button>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <app-icon name="map-pin" class="w-6 h-6 text-white/50"></app-icon>
      </div>
    </header>
  `,
  styles: [`
    .animate-fadeInUp { animation: fade-in-up 0.8s ease-out forwards; }
    .delay-100 { animation-delay: 0.1s; } .delay-200 { animation-delay: 0.2s; } .delay-300 { animation-delay: 0.3s; }
    @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class HeroComponent {
  protected cfg = inject(ConfigService).config();

  @Output() startJourney = new EventEmitter<JourneyTarget>();
}
