import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import all new sub-components
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturedPortfolioComponent } from './components/featured-portfolio/featured-portfolio.component';
import { ServicesComponent } from './components/services/services.component';
import { MortgageCalculatorComponent } from './components/mortgage-calculator/mortgage-calculator.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';

import { Testimonial, Property } from '../../core/models/models';
import { ListingService } from '../../core/services/listing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HeroComponent, 
    AboutComponent, 
    FeaturedPortfolioComponent,
    ServicesComponent,
    MortgageCalculatorComponent,
    TestimonialsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private listingService = inject(ListingService);
  private route = inject(ActivatedRoute);
  
  @ViewChild(ContactComponent) contactComponent!: ContactComponent; // Access the child component

  testimonials: Testimonial[] = [];
  featuredListings: Property[] = [];

  ngOnInit() {
    // 1. Fetch Data
    this.listingService.getTestimonials().subscribe(data => {
      this.testimonials = data;
    });

    this.listingService.getListings().subscribe(data => {
      this.featuredListings = data.slice(0, 3);
    });

    // 2. Handle Routing Params (e.g. from Listing Detail page)
    this.route.queryParams.subscribe(params => {
      if (params['interest']) {
        // We need to wait for the view to initialize to access the contact component
        setTimeout(() => {
          if (this.contactComponent) {
            let msg = '';
            if (params['listing']) {
              msg = `I am interested in the property: ${params['listing']}`;
            }
            this.contactComponent.setInterest(params['interest'], msg);
            this.scrollTo('contact');
          }
        }, 100);
      }
    });
  }

  // Orchestrator method: Called by Hero and Services components
  handleStartJourney(interestType: string) {
    if (this.contactComponent) {
      this.contactComponent.setInterest(interestType);
      this.scrollTo('contact');
    }
  }

  private scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) { 
      element.scrollIntoView({ behavior: 'smooth' }); 
    }
  }
}