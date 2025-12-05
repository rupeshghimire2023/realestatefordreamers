import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Property } from '../../../../core/models/models';

@Component({
  selector: 'app-home-featured-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="portfolio" class="py-20 bg-slate-50 border-t border-slate-100" *ngIf="listings.length > 0">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-amber-600 font-semibold tracking-wider text-sm uppercase">Exclusive Inventory</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-2">Featured Properties</h2>
          <p class="text-slate-600 mt-4">A sneak peek at our current highlights.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div *ngFor="let property of listings" 
               [routerLink]="['/listing', property.id]" 
               class="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
            
            <div class="relative h-64 overflow-hidden">
              <img [src]="property.imageUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm"
                 [ngClass]="{
                   'bg-green-500 text-white': property.status === 'active',
                   'bg-amber-500 text-white': property.status === 'coming-soon',
                   'bg-red-500 text-white': property.status === 'sold'
                 }">
                {{ property.status.replace('-', ' ') }}
              </div>
            </div>

            <div class="p-6 flex-1 flex flex-col">
              <h3 class="text-lg font-serif font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{{ property.title }}</h3>
              <p class="text-slate-500 text-sm mb-4">{{ property.address }}</p>
              <div class="mt-auto border-t border-slate-50 pt-4 flex justify-between items-center">
                 <!-- FIX: Removed the $ symbol before the double curly braces -->
                 <span class="font-bold text-slate-900">
                   \${{ (property.status === 'sold' ? property.soldPrice : property.price) | number }}
                 </span>
                 <span class="text-xs text-amber-600 uppercase font-bold tracking-wider">View &rarr;</span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <a routerLink="/portfolio" class="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl cursor-pointer">
            View Full Portfolio
          </a>
        </div>
      </div>
    </section>
  `
})
export class FeaturedPortfolioComponent {
  @Input() listings: Property[] = [];
}