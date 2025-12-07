import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ListingService } from '../../core/services/listing.service';
import { LeadService } from '../../core/services/lead.service';
import { Property } from '../../core/models/models';

@Component({
  selector: 'app-listing-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, IconComponent],
  templateUrl: './listing-detail.component.html'
})
export class ListingDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private listingService = inject(ListingService);
  private leadService = inject(LeadService);
  private fb = inject(FormBuilder);
  
  listing: Property | undefined;
  isLoading = true;

  // Valuation Form
  valuationForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  constructor() {
    this.valuationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      beds: [''],
      baths: [''],
      sqft: ['']
    });
  }

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
    });
  }

  // --- Submit Valuation Request ---
  onValuationSubmit() {
    if (this.valuationForm.valid) {
      this.isSubmitting = true;
      const val = this.valuationForm.value;

      // Construct a detailed message with the home stats
      const message = `REQUEST FOR VALUATION:
      Property Address: ${val.address}
      Stats: ${val.beds} Beds, ${val.baths} Baths, ${val.sqft} SqFt.
      
      User is requesting a professional home valuation based on the sale of ${this.listing?.title}.`;

      // Create the lead object matching your interface
      const leadData = {
        firstName: val.firstName,
        lastName: val.lastName,
        email: val.email,
        phone: val.phone,
        interest: 'selling', // This triggers the Seller's Guide email automatically!
        message: message
      };

      this.leadService.submitLead(leadData)
        .then(() => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.valuationForm.reset();
          // Reset success message after 5 seconds
          setTimeout(() => this.submitSuccess = false, 5000);
        })
        .catch(err => {
          console.error('Error submitting valuation', err);
          this.isSubmitting = false;
        });
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