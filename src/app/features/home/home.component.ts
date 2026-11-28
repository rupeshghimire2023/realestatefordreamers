import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturedPortfolioComponent } from './components/featured-portfolio/featured-portfolio.component';
import { ServicesComponent } from './components/services/services.component';
import { MortgageCalculatorComponent } from './components/mortgage-calculator/mortgage-calculator.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeValueComponent } from './components/home-value/home-value.component';
import { ListingService } from '../../core/services/listing.service';
import { BlogService } from '../../core/services/blog.service';
import { ContactIntentService, toLeadInterest } from '../../core/services/contact-intent.service';
import { SectionNavService } from '../../core/services/section-nav.service';
import { ExcerptPipe } from '../../shared/pipes/excerpt.pipe';
import { JourneyTarget } from '../../core/models/models';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    AboutComponent,
    FeaturedPortfolioComponent,
    ServicesComponent,
    MortgageCalculatorComponent,
    TestimonialsComponent,
    HomeValueComponent,
    ContactComponent,
    ExcerptPipe
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private listingService = inject(ListingService);
  private blogService = inject(BlogService);
  private contactIntents = inject(ContactIntentService);
  private sectionNav = inject(SectionNavService);

  // toSignal unsubscribes from the live Firestore queries when the page is left.
  readonly testimonials = toSignal(this.listingService.getTestimonials(), { initialValue: [] });
  private readonly listings = toSignal(this.listingService.getListings(), { initialValue: [] });
  readonly recentPosts = toSignal(this.blogService.getPosts().pipe(map(posts => posts.slice(0, 3))), { initialValue: [] });

  // Prefer listings flagged as featured; fall back to the first ones if none are.
  readonly featuredListings = computed(() => {
    const all = this.listings();
    const featured = all.filter(p => p.featured);
    return (featured.length ? featured : all).slice(0, 3);
  });

  constructor() {
    // Links like /?interest=buying&listing=Some%20House#contact (from a listing page)
    // pre-fill the contact form. The router scrolls to #contact; the form applies the
    // request whenever its deferred block loads.
    inject(ActivatedRoute).queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const interest = params.get('interest');
      if (!interest) return;
      const listing = params.get('listing');
      this.contactIntents.request({
        interest: toLeadInterest(interest),
        message: listing ? `I am interested in the property: ${listing}` : undefined
      });
    });
  }

  // Called by the Hero and Services components
  handleStartJourney(target: JourneyTarget) {
    switch (target) {
      case 'services':
        this.sectionNav.scrollTo('buying');
        break;
      case 'about':
        this.sectionNav.scrollTo('about');
        break;
      default:
        this.contactIntents.request({ interest: target });
        this.sectionNav.scrollTo('contact');
    }
  }
}
