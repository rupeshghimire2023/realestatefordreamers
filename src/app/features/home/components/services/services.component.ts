import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-home-services',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <!-- FIX: Changed id="services" back to id="buying" so the Navbar link finds it -->
    <section id="buying" class="py-24 bg-slate-50">
      <div class="container mx-auto px-6">
        
        <div class="text-center mb-16">
          <span class="text-amber-600 font-semibold tracking-wider text-sm uppercase">Our Expertise</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-2">Tailored Services for You</h2>
          <p class="text-slate-600 mt-4 max-w-2xl mx-auto">
            Whether you are beginning your journey or closing a chapter, we provide the strategic guidance you need.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          
          <!-- BUYING CARD -->
          <div class="relative h-[600px] rounded-3xl overflow-hidden group shadow-2xl cursor-default">
            <!-- Background Image -->
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600" 
                 class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 alt="Buying a home">
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>

            <!-- Content -->
            <div class="absolute inset-0 p-10 flex flex-col justify-end">
              <div class="mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div class="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                  <app-icon name="home" class="w-8 h-8"></app-icon>
                </div>
                
                <h3 class="text-3xl font-serif font-bold text-white mb-3">Buying a Home?</h3>
                <p class="text-slate-300 text-lg leading-relaxed mb-6">
                  Find your place in the world with comprehensive needs analysis and global relocation expertise.
                </p>

                <ul class="space-y-3 mb-8 border-t border-white/20 pt-6">
                  <li class="flex items-center gap-3 text-slate-200">
                    <app-icon name="star-filled" class="w-5 h-5 text-amber-500"></app-icon>
                    Needs Analysis & Lifestyle Matching
                  </li>
                  <li class="flex items-center gap-3 text-slate-200">
                    <app-icon name="star-filled" class="w-5 h-5 text-amber-500"></app-icon>
                    Virtual Tours & Remote Buying
                  </li>
                  <li class="flex items-center gap-3 text-slate-200">
                    <app-icon name="star-filled" class="w-5 h-5 text-amber-500"></app-icon>
                    Strategic Contract Negotiation
                  </li>
                </ul>

                <button (click)="startJourney.emit('buying')" 
                        class="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2">
                  Start Buying Journey
                  <app-icon name="chevron-right" class="w-4 h-4"></app-icon>
                </button>
              </div>
            </div>
          </div>
          
          <!-- SELLING CARD -->
          <div class="relative h-[600px] rounded-3xl overflow-hidden group shadow-2xl cursor-default">
            <!-- Background Image -->
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600" 
                 class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 alt="Selling a home">
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>

            <!-- Content -->
            <div class="absolute inset-0 p-10 flex flex-col justify-end">
              <div class="mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 mb-6 shadow-lg">
                  <app-icon name="star" class="w-8 h-8"></app-icon>
                </div>
                
                <h3 class="text-3xl font-serif font-bold text-white mb-3">Selling Your Property?</h3>
                <p class="text-slate-300 text-lg leading-relaxed mb-6">
                  Maximize your investment with data-driven valuation and high-end marketing campaigns.
                </p>

                <ul class="space-y-3 mb-8 border-t border-white/20 pt-6">
                  <li class="flex items-center gap-3 text-slate-200">
                    <app-icon name="star-filled" class="w-5 h-5 text-amber-500"></app-icon>
                    Data-Driven Home Valuation
                  </li>
                  <li class="flex items-center gap-3 text-slate-200">
                    <app-icon name="star-filled" class="w-5 h-5 text-amber-500"></app-icon>
                    Professional Staging & Photography
                  </li>
                  <li class="flex items-center gap-3 text-slate-200">
                    <app-icon name="star-filled" class="w-5 h-5 text-amber-500"></app-icon>
                    Targeted Marketing Campaigns
                  </li>
                </ul>

                <button (click)="startJourney.emit('selling')" 
                        class="w-full py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-white hover:text-slate-900 transition-all shadow-lg flex items-center justify-center gap-2">
                  Start Selling Journey
                  <app-icon name="chevron-right" class="w-4 h-4"></app-icon>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {
  @Output() startJourney = new EventEmitter<string>();
}