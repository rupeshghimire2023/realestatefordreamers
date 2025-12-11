import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-home-about',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="about" class="py-24 bg-white relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Left Column: Image -->
          <div class="relative order-2 lg:order-1">
            <div class="absolute -top-4 -left-4 w-24 h-24 bg-amber-100 rounded-full opacity-50 z-0"></div>
            <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-100 rounded-full opacity-50 z-0"></div>
            
            <img src="https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_pic_four.JPEG?alt=media&token=b3c0220f-1357-4cd8-843b-281796ffd43a?auto=format&fit=crop&q=80&w=800" 
                 class="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[600px]" alt="Realtor Portrait" loading="lazy" fetchpriority="low">
            
            <!-- Experience Badge -->
            <div class="absolute bottom-8 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 border-l-4 border-amber-500">
              <p class="text-slate-500 text-xs font-bold uppercase tracking-wide mb-1">Serving Since</p>
              <p class="text-4xl font-bold text-slate-900">2021</p>
            </div>
          </div>
          
          <!-- Right Column: Content -->
          <div class="order-1 lg:order-2">
            <div class="mb-4 flex items-center gap-2">
               <span class="w-8 h-0.5 bg-amber-500"></span>
               <span class="text-amber-600 font-semibold tracking-wider text-sm uppercase">Main Street Realty Group</span>
            </div>
            
            <h2 class="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Turning the Stress of Moving into the <span class="text-amber-500">Joy of Home</span>.
            </h2>
            
            <div class="prose prose-slate text-slate-600 mb-8 leading-relaxed">
              <p class="mb-4">
                Moving can be a scary process, and no one knows that better than me. My journey began in <strong>Nepal</strong>, took me to <strong>India</strong> and <strong>Australia</strong>, before finally finding my home in <strong>Atlanta</strong>.
              </p>
              <p class="mb-6">
                Although constant relocation was challenging, it sparked a lifelong passion for seeing new homes and meeting new people.
              </p>
              
              <!-- Inspiration Block -->
              <div class="bg-slate-50 border-l-4 border-amber-500 p-5 rounded-r-lg mb-6 italic text-slate-700 shadow-sm">
                "Rich Dad Poor Dad" by Robert T. Kiyosaki wasn't just a book I read young—it was the spark that confirmed real estate was my calling.
              </div>

              <p>
                My patience, empathy, perceptivity, and understanding are at the core of my service. I am a firm believer in being armed with knowledge, striving to educate my clients so they can make informed decisions throughout their real estate process.
              </p>
            </div>

            <!-- Awards / Stats Row -->
            <div class="grid grid-cols-2 gap-4 mb-8">
               <!-- Top Producer Card -->
               <div class="bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <app-icon name="star" class="w-5 h-5"></app-icon>
                    </div>
                    <span class="font-bold text-slate-900 text-sm">Top Producer</span>
                  </div>
                  <div class="flex gap-1 flex-wrap">
                    <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">2022</span>
                    <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">2023</span>
                    <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">2024</span>
                  </div>
               </div>

               <!-- Global Perspective Card -->
               <div class="bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <app-icon name="home" class="w-5 h-5"></app-icon>
                    </div>
                    <span class="font-bold text-slate-900 text-sm">Global Journey</span>
                  </div>
                  <p class="text-xs text-slate-500 font-medium leading-relaxed">Nepal • India • Australia • Atlanta</p>
               </div>
            </div>

            <!-- Profile Signature -->
            <div class="flex items-center gap-4 pt-6 border-t border-slate-100">
               <img src="https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_profile.JPG?alt=media&token=fbb83206-b27a-4eb2-9262-cd3f3c0af8c7" class="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover" alt="Kritika Katwal">
               <div>
                  <p class="font-serif font-bold text-slate-900 text-lg">Kritika Katwal</p>
                  <p class="text-xs text-amber-600 uppercase tracking-wide font-bold">Top Producer | Realtor®</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {}