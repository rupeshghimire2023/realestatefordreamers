import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { LeadService } from '../../../../core/services/lead.service';
import { LEAD_LIMITS, describeHome } from '../../../../core/utils/lead';
import { phoneValidator } from '../../../../shared/validators/phone.validator';

@Component({
  selector: 'app-home-value',
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  template: `
    <section id="valuation" class="py-24 bg-white relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-12 transform origin-top-right translate-x-20 z-0"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Left: Value Proposition -->
          <div class="order-2 lg:order-1">
            <div class="inline-flex items-center gap-2 mb-4">
              <div class="w-8 h-0.5 bg-amber-500"></div>
              <span class="text-amber-600 font-semibold tracking-wider text-sm uppercase">Sellers</span>
            </div>
            
            <h2 class="text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Curious what your home is <span class="text-amber-500">worth?</span>
            </h2>
            <p class="text-slate-600 mb-8 text-lg leading-relaxed">
              The market is constantly changing. Get a professional, data-driven Comparative Market Analysis (CMA) sent directly to your inbox—no automated guesses, just real expert analysis.
            </p>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mt-1 shrink-0">
                  <app-icon name="star-filled" class="w-5 h-5"></app-icon>
                </div>
                <div>
                  <h4 class="font-bold text-slate-900">Accurate Valuation</h4>
                  <p class="text-slate-500 text-sm">Based on recent comparable sales in your specific neighborhood.</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mt-1 shrink-0">
                  <app-icon name="home" class="w-5 h-5"></app-icon>
                </div>
                <div>
                  <h4 class="font-bold text-slate-900">Improvement Advice</h4>
                  <p class="text-slate-500 text-sm">Tips on which upgrades will give you the highest return on investment.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Valuation Form -->
          <div class="order-1 lg:order-2 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative">
            <form [formGroup]="valuationForm" (ngSubmit)="onSubmit()" class="relative">
              <!-- Spam trap: off-screen and hidden from screen readers. People never fill it in; bots usually do. -->
              <div class="absolute -left-[10000px] w-px h-px overflow-hidden" aria-hidden="true">
                <label for="valuation-website">Website</label>
                <input id="valuation-website" type="text" formControlName="website" tabindex="-1" autocomplete="off">
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <app-icon name="home" class="w-5 h-5 text-amber-500"></app-icon> Free Home Valuation
              </h3>
              
              <!-- Property Details -->
              <div class="space-y-4 mb-6">
                <div>
                  <label for="valuation-address" class="block text-xs font-bold text-slate-500 uppercase mb-1">Property Address</label>
                  <input id="valuation-address"
                         formControlName="address" 
                         type="text" 
                         autocomplete="street-address"
                         [maxlength]="limits.address"
                         placeholder="Street, city, ZIP" 
                         aria-describedby="valuation-address-hint"
                         class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all placeholder:text-slate-400">
                  
                  <p id="valuation-address-hint" class="text-slate-400 text-xs mt-1">Georgia properties only.</p>
                </div>
                
                <div class="grid grid-cols-3 gap-3">
                  <div>
                    <label for="valuation-beds" class="block text-xs font-bold text-slate-500 uppercase mb-1">Beds</label>
                    <input id="valuation-beds" formControlName="beds" type="number" min="0" placeholder="4" 
                           class="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                  </div>
                  <div>
                    <label for="valuation-baths" class="block text-xs font-bold text-slate-500 uppercase mb-1">Baths</label>
                    <input id="valuation-baths" formControlName="baths" type="number" min="0" step="0.5" placeholder="3" 
                           class="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                  </div>
                  <div>
                    <label for="valuation-sqft" class="block text-xs font-bold text-slate-500 uppercase mb-1">Sq Ft</label>
                    <input id="valuation-sqft" formControlName="sqft" type="number" min="0" placeholder="2500" 
                           class="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                  </div>
                </div>
              </div>

              <!-- Contact Details -->
              <div class="space-y-4 mb-6 pt-6 border-t border-slate-100">
                <div class="grid grid-cols-2 gap-3">
                  <input formControlName="firstName" type="text" placeholder="First Name" aria-label="First name" autocomplete="given-name" [maxlength]="limits.name"
                         class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                  <input formControlName="lastName" type="text" placeholder="Last Name" aria-label="Last name" autocomplete="family-name" [maxlength]="limits.name"
                         class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                </div>
                <input formControlName="email" type="email" placeholder="Email Address" aria-label="Email address" autocomplete="email" [maxlength]="limits.email"
                       class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                <input formControlName="phone" type="tel" placeholder="Phone Number" aria-label="Phone number" autocomplete="tel" [maxlength]="limits.phone"
                       [class.border-red-500]="phoneInvalid()"
                       [attr.aria-invalid]="phoneInvalid()"
                       class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                <p *ngIf="phoneInvalid()" class="text-red-500 text-xs -mt-2">Please enter a valid phone number (10+ digits)</p>
              </div>

              <button type="submit" 
                      [disabled]="valuationForm.invalid || isSubmitting()"
                      class="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                <span *ngIf="isSubmitting()" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                {{ isSubmitting() ? 'Sending Request...' : 'Get My Estimate' }}
              </button>
              
              <p *ngIf="submitSuccess()" role="status" class="mt-3 text-green-600 text-center font-bold text-sm bg-green-50 py-2 rounded-lg">
                 Request Sent! Check your email shortly.
              </p>
              <p *ngIf="submitError()" role="alert" class="mt-3 text-red-600 text-center font-medium text-sm bg-red-50 py-2 rounded-lg">{{ submitError() }}</p>
            </form>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HomeValueComponent {
  private fb = inject(FormBuilder).nonNullable;
  private leadService = inject(LeadService);
  protected readonly limits = LEAD_LIMITS;

  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal('');

  readonly valuationForm = this.fb.group({
    address: ['', [Validators.required, Validators.maxLength(LEAD_LIMITS.address)]],
    beds: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
    baths: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
    sqft: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
    firstName: ['', [Validators.required, Validators.maxLength(LEAD_LIMITS.name)]],
    lastName: ['', [Validators.required, Validators.maxLength(LEAD_LIMITS.name)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(LEAD_LIMITS.email)]],
    phone: ['', [Validators.required, phoneValidator]],
    website: [''] // spam trap, see template
  });

  phoneInvalid(): boolean {
    const phone = this.valuationForm.controls.phone;
    return phone.invalid && phone.touched;
  }

  onSubmit() {
    if (this.valuationForm.invalid) return;
    this.isSubmitting.set(true);
    this.submitError.set('');
    const val = this.valuationForm.getRawValue();

    const message = [
      'HOMEPAGE VALUATION REQUEST:',
      `Address: ${val.address}`,
      `Details: ${describeHome(val)}`
    ].join('\n');

    this.leadService.submitLead({
      firstName: val.firstName,
      lastName: val.lastName,
      email: val.email,
      phone: val.phone,
      interest: 'selling',
      message
    }, { honeypot: val.website })
      .then(() => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.valuationForm.reset();
        setTimeout(() => this.submitSuccess.set(false), 5000);
      })
      .catch(err => {
        console.error('Error submitting form', err);
        this.isSubmitting.set(false);
        this.submitError.set("We couldn't send your request. Please try again, or call or email us directly.");
      });
  }
}
