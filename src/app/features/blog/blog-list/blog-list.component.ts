import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { BlogPost } from '../../../core/models/models';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, DatePipe],
  template: `
    <div class="min-h-screen bg-slate-50">
      
      <!-- Dark Hero Section (Matches Portfolio & Home) -->
      <div class="bg-slate-900 pt-32 pb-32 relative overflow-hidden">
        <!-- Abstract Background Elements -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-10 -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-slate-700 rounded-full blur-3xl opacity-20 -ml-16 -mb-16"></div>

        <div class="container mx-auto px-6 relative z-10 text-center">
          <span class="text-amber-500 font-semibold tracking-widest text-sm uppercase animate-fadeInUp">Market Insights</span>
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-white mt-4 mb-6 animate-fadeInUp delay-100">
            Real Estate News & Tips
          </h1>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed animate-fadeInUp delay-200">
            Stay informed with the latest trends, buying guides, and local market updates curated for the Georgia market.
          </p>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="container mx-auto px-6 -mt-20 relative z-20 pb-20">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div *ngFor="let post of posts$ | async" 
               [routerLink]="['/blog', post.id]" 
               class="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col animate-fadeInUp delay-300 cursor-pointer">
            
            <!-- Image -->
            <div class="relative h-60 overflow-hidden">
              <div class="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
              <img [src]="post.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'" 
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              
              <!-- Date Badge -->
              <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase shadow-sm z-20">
                {{ post.date.seconds * 1000 | date:'mediumDate' }}
              </div>
              
              <!-- Category Badge -->
               <div class="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-500 uppercase tracking-wider z-20 border border-slate-700">
                {{ post.category || 'Real Estate' }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-8 flex-1 flex flex-col">
              <h3 class="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                {{ post.title }}
              </h3>
              
              <p class="text-slate-500 mb-6 line-clamp-3 text-sm leading-relaxed">
                {{ post.content }}
              </p>
              
              <div class="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
                <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                     <img src="https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_profile.JPG?alt=media&token=fbb83206-b27a-4eb2-9262-cd3f3c0af8c7" class="w-full h-full object-cover">
                   </div>
                   <span class="text-xs font-bold text-slate-700 uppercase tracking-wide">Kritika Katwal</span>
                </div>
                <span class="text-amber-600 text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Article <app-icon name="chevron-right" class="w-3 h-3"></app-icon>
                </span>
              </div>
            </div>
          </div>
          
        </div>
        
        <!-- Empty State -->
        <div *ngIf="(posts$ | async)?.length === 0" class="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <p class="text-slate-400">No articles published yet. Check back soon!</p>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fadeInUp { animation: fade-in-up 0.8s ease-out forwards; }
    .delay-100 { animation-delay: 0.1s; } .delay-200 { animation-delay: 0.2s; } .delay-300 { animation-delay: 0.3s; }
  `]
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogService);
  posts$ = this.blogService.getPosts();

  ngOnInit() {}
}