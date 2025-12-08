import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { LeadService } from '../../../../core/services/lead.service';

@Component({
  selector: 'app-home-value',
  standalone: true,
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
            <form [formGroup]="valuationForm" (ngSubmit)="onSubmit()">
              <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <app-icon name="home" class="w-5 h-5 text-amber-500"></app-icon> Free Home Valuation
              </h3>
              
              <!-- Property Details -->
              <div class="space-y-4 mb-6">
                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Property Address</label>
                  <input formControlName="address" type="text" placeholder="Enter your address..." 
                         class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                </div>
                
                <div class="grid grid-cols-3 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Beds</label>
                    <input formControlName="beds" type="number" placeholder="4" 
                           class="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Baths</label>
                    <input formControlName="baths" type="number" placeholder="3" 
                           class="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Sq Ft</label>
                    <input formControlName="sqft" type="number" placeholder="2500" 
                           class="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                  </div>
                </div>
              </div>

              <!-- Contact Details -->
              <div class="space-y-4 mb-6 pt-6 border-t border-slate-100">
                <div class="grid grid-cols-2 gap-3">
                  <input formControlName="firstName" type="text" placeholder="First Name" 
                         class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                  <input formControlName="lastName" type="text" placeholder="Last Name" 
                         class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                </div>
                <input formControlName="email" type="email" placeholder="Email Address" 
                       class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
                <input formControlName="phone" type="tel" placeholder="Phone Number" 
                       class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-700 transition-all">
              </div>

              <button type="submit" 
                      [disabled]="valuationForm.invalid || isSubmitting"
                      class="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                <span *ngIf="isSubmitting" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                {{ isSubmitting ? 'Sending Request...' : 'Get My Estimate' }}
              </button>
              
              <p *ngIf="submitSuccess" class="mt-3 text-green-600 text-center font-bold text-sm bg-green-50 py-2 rounded-lg">
                 Request Sent! Check your email shortly.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HomeValueComponent {
  private fb = inject(FormBuilder);
  private leadService = inject(LeadService);
  
  isSubmitting = false;
  submitSuccess = false;
  valuationForm: FormGroup;

  constructor() {
    this.valuationForm = this.fb.group({
      address: ['', Validators.required],
      beds: ['', Validators.required],
      baths: ['', Validators.required],
      sqft: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.valuationForm.valid) {
      this.isSubmitting = true;
      const val = this.valuationForm.value;

      // Construct a specific message for the "selling" interest
      // This ensures your AI Agent sends the "Seller's Roadmap"
      const message = `HOMEPAGE VALUATION REQUEST:
      Address: ${val.address}
      Details: ${val.beds} Beds, ${val.baths} Baths, ${val.sqft} SqFt.`;

      const leadData = {
        firstName: val.firstName,
        lastName: val.lastName,
        email: val.email,
        phone: val.phone,
        interest: 'selling', // Triggers Seller AI flow
        message: message
      };

      this.leadService.submitLead(leadData)
        .then(() => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.valuationForm.reset();
          setTimeout(() => this.submitSuccess = false, 5000);
        })
        .catch(err => {
          console.error('Error submitting form', err);
          this.isSubmitting = false;
        });
    }
  }
}