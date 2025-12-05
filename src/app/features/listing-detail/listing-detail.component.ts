import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Added FormsModule
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ListingService } from '../../core/services/listing.service';
import { Property } from '../../core/models/models';

@Component({
  selector: 'app-listing-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, IconComponent], // Added FormsModule to imports
  templateUrl: './listing-detail.component.html'
})
export class ListingDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private listingService = inject(ListingService);
  
  listing: Property | undefined;
  isLoading = true;

  // Estimate Variables
  estSqft: number | null = null;
  estBeds: number | null = null;
  estBaths: number | null = null;
  estimatedValue: number | null = null;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadListing(id);
    });
  }

  loadListing(id: string) {
    this.listingService.getListingById(id).subscribe(data => {
      this.listing = data;
      this.isLoading = false;
      this.resetEstimate();
    });
  }

  resetEstimate() {
    this.estSqft = null;
    this.estBeds = null;
    this.estBaths = null;
    this.estimatedValue = null;
  }

  calculateEstimate() {
    if (this.listing && this.listing.status === 'sold' && this.listing.soldPrice && this.estSqft) {
      // Logic: Calculate based on the comparable Price Per SqFt of the sold listing
      const pricePerSqFt = this.listing.soldPrice / this.listing.sqft;
      
      // Add slight adjustments for beds/baths (simplified logic for demo)
      // e.g., slightly penalize if user has fewer beds than the comp, bonus if more
      const bedDiff = (this.estBeds || this.listing.beds) - this.listing.beds;
      const bathDiff = (this.estBaths || this.listing.baths) - this.listing.baths;
      
      const adjustment = (bedDiff * 15000) + (bathDiff * 10000);
      
      this.estimatedValue = (this.estSqft * pricePerSqFt) + adjustment;
    }
  }

  contactRealtor(interestType: string) {
    this.router.navigate(['/'], { 
      queryParams: { 
        interest: interestType,
        listing: this.listing?.title 
      },
      fragment: 'contact'
    });
  }
}