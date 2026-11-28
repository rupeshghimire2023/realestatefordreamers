import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ListingService } from '../../core/services/listing.service';
import { LeadService } from '../../core/services/lead.service';
import { ConfigService } from '../../core/services/config.service';
import { LeadInterest } from '../../core/models/models';
import { LEAD_LIMITS, describeHome } from '../../core/utils/lead';
import { phoneValidator } from '../../shared/validators/phone.validator';

@Component({
  selector: 'app-listing-detail',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, IconComponent],
  templateUrl: './listing-detail.component.html'
})
export class ListingDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private listingService = inject(ListingService);
  private leadService = inject(LeadService);
  private config = inject(ConfigService);
  private fb = inject(FormBuilder).nonNullable;
  protected readonly limits = LEAD_LIMITS;

  /** undefined while loading, null if there's no listing with this id. */
  readonly listing = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      // switchMap drops the previous listing's live query when the id changes.
      switchMap(id => this.listingService.getListingById(id).pipe(startWith(undefined)))
    ),
    { initialValue: undefined }
  );

  // Valuation Form (shown on sold listings)
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal('');
  readonly valuationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(LEAD_LIMITS.name)]],
    lastName: ['', [Validators.required, Validators.maxLength(LEAD_LIMITS.name)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(LEAD_LIMITS.email)]],
    phone: ['', [Validators.required, phoneValidator]],
    address: ['', [Validators.required, Validators.maxLength(LEAD_LIMITS.address)]],
    beds: this.fb.control<number | null>(null, Validators.min(0)),
    baths: this.fb.control<number | null>(null, Validators.min(0)),
    sqft: this.fb.control<number | null>(null, Validators.min(0)),
    website: [''] // spam trap, see template
  });

  constructor() {
    const title = inject(Title);
    effect(() => {
      const listing = this.listing();
      if (listing) title.setTitle(this.config.pageTitle(listing.title));
      else if (listing === null) title.setTitle(this.config.pageTitle('Listing not found'));
    });
  }

  phoneInvalid(): boolean {
    const phone = this.valuationForm.controls.phone;
    return phone.invalid && phone.touched;
  }

  // --- Submit Valuation Request ---
  onValuationSubmit() {
    if (this.valuationForm.invalid) return;
    this.isSubmitting.set(true);
    this.submitError.set('');
    const val = this.valuationForm.getRawValue();

    const message = [
      'REQUEST FOR VALUATION:',
      `Property Address: ${val.address}`,
      `Stats: ${describeHome(val)}`,
      '',
      `User is requesting a professional home valuation based on the sale of ${this.listing()?.title ?? 'a sold listing'}.`
    ].join('\n');

    this.leadService.submitLead({
      firstName: val.firstName,
      lastName: val.lastName,
      email: val.email,
      phone: val.phone,
      interest: 'selling', // This triggers the Seller's Guide email automatically!
      message
    }, { honeypot: val.website })
      .then(() => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.valuationForm.reset();
        setTimeout(() => this.submitSuccess.set(false), 5000);
      })
      .catch(err => {
        console.error('Error submitting valuation', err);
        this.isSubmitting.set(false);
        this.submitError.set("We couldn't send your request. Please try again, or call or email us directly.");
      });
  }

  /** Opens the home page's contact form, pre-filled for this property. */
  contactRealtor(interest: LeadInterest) {
    this.router.navigate(['/'], {
      queryParams: { interest, listing: this.listing()?.title },
      fragment: 'contact'
    });
  }
}
