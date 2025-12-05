import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { Testimonial } from '../../../../core/models/models';

@Component({
  selector: 'app-home-testimonials',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="testimonials" class="py-24 bg-slate-50 relative overflow-hidden">
      <!-- Decorative Background Text (Subtle) -->
      <div class="absolute top-10 left-10 text-[200px] leading-none font-serif text-slate-100 select-none -z-10 opacity-60">"</div>
      
      <div class="container mx-auto px-6 relative z-10">
        
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div class="max-w-xl">
            <span class="text-amber-600 font-semibold tracking-wider text-sm uppercase">Client Love</span>
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-2">Stories of Success</h2>
            <p class="text-slate-600 mt-4 text-lg">
              Real estate is about more than property; it's about people. Here is what our clients have to say about their journey.
            </p>
          </div>

          <!-- Navigation Buttons (Top Right for Desktop) -->
          <div class="flex gap-4">
            <button (click)="scrollTestimonials('left')" 
                    class="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
              <app-icon name="chevron-left" class="w-6 h-6"></app-icon>
            </button>
            <button (click)="scrollTestimonials('right')" 
                    class="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
              <app-icon name="chevron-right" class="w-6 h-6"></app-icon>
            </button>
          </div>
        </div>
        
        <!-- Carousel Container -->
        <div #testimonialContainer 
             class="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scrollbar-hide scroll-smooth"
             style="scrollbar-width: none; -ms-overflow-style: none;">
          
          <div *ngFor="let t of testimonials" 
               class="min-w-[85vw] md:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)] snap-center bg-white p-10 rounded-3xl shadow-sm border border-slate-100 relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            
            <!-- Quote Icon -->
            <div class="absolute top-8 right-8 text-amber-100 group-hover:text-amber-200 transition-colors">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
              </svg>
            </div>
            
            <!-- 5-Star Rating -->
            <div class="relative z-10 flex gap-1 mb-6">
              <app-icon *ngFor="let i of [1,2,3,4,5]" name="star-filled" class="w-4 h-4 text-amber-400"></app-icon>
            </div>

            <!-- Testimonial Text -->
            <p class="text-slate-600 relative z-10 mb-8 italic leading-relaxed flex-1 text-lg">
              "{{ t.text }}"
            </p>

            <!-- Media / Author Section -->
            <div class="flex items-center gap-4 border-t border-slate-50 pt-6 mt-auto">
              
              <!-- Case A: Client Photo Uploaded -->
              <div *ngIf="t.imageUrl" class="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                <img [src]="t.imageUrl" class="w-full h-full object-cover" alt="Client photo">
              </div>

              <!-- Case B: No Photo (Use Initials) -->
              <div *ngIf="!t.imageUrl" class="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold shrink-0 border-2 border-white shadow-sm">
                {{ t.author.charAt(0) }}
              </div>

              <div>
                <p class="font-serif font-bold text-slate-900 text-lg">{{ t.author }}</p>
                <p class="text-xs text-amber-600 font-bold uppercase tracking-wider">{{ t.location }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {
  @Input() testimonials: Testimonial[] = [];
  @ViewChild('testimonialContainer') testimonialContainer!: ElementRef;

  scrollTestimonials(direction: 'left' | 'right') {
    if (this.testimonialContainer) {
      const container = this.testimonialContainer.nativeElement;
      // Scroll amount optimized for the new card width
      const cardWidth = container.querySelector('div')?.clientWidth || 300;
      const scrollAmount = cardWidth + 24; // Card width + gap (6 * 4px)
      
      if (direction === 'left') { container.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); } 
      else { container.scrollBy({ left: scrollAmount, behavior: 'smooth' }); }
    }
  }
}