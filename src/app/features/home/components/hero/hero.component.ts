import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <header id="home" class="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      
      <!-- Background Video -->
      <div class="absolute inset-0 z-0">
        <!-- 
          FIXES APPLIED:
          1. [muted]="true": Forces the DOM property to true (required for autoplay)
          2. poster: Shows the image immediately while video loads
          3. preload="auto": Tells browser to fetch video data ASAP
        -->
        <video 
          autoplay 
          loop 
          [muted]="true" 
          playsinline 
          preload="auto"
          class="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2070">
          <source src="https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fbackground_video.mp4?alt=media&token=70d6dc58-2bb4-4e3e-b168-fddebaa8f6bd" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        
        <!-- Dark Overlay (Critical for text readability) -->
        <div class="absolute inset-0 bg-slate-900/50"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10 text-center text-white mt-16">
        <p class="text-amber-400 font-medium tracking-widest uppercase mb-4 animate-fadeInUp">Georgia Real Estate</p>
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight animate-fadeInUp delay-100">
          Find Your Place in the <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">World</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fadeInUp delay-200">
          Whether you are buying your first home or selling a cherished estate, 
          we make your real estate dreams a reality in Georgia.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp delay-300">
          <button (click)="startJourney.emit('buying')" class="px-8 py-4 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/30 w-full sm:w-auto">
            Our Services
          </button>
          <button (click)="startJourney.emit('buying')" class="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-all w-full sm:w-auto">
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
  @Output() startJourney = new EventEmitter<string>();
}