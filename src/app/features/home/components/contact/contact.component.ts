import { Component, Injector, afterNextRender, effect, inject, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { LeadService } from '../../../../core/services/lead.service';
import { ConfigService } from '../../../../core/services/config.service';
import { ContactIntentService } from '../../../../core/services/contact-intent.service';
import { SectionNavService } from '../../../../core/services/section-nav.service';
import { LeadInterest } from '../../../../core/models/models';
import { LEAD_LIMITS } from '../../../../core/utils/lead';
import { phoneValidator } from '../../../../shared/validators/phone.validator';
import { ImgFallbackDirective } from '../../../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-home-contact',
  imports: [CommonModule, ReactiveFormsModule, IconComponent, ImgFallbackDirective],
  template: `
    <section class="py-24 bg-white relative overflow-hidden">
      <!-- Decorative Background -->
      <div class="absolute right-0 top-0 w-1/3 h-full bg-slate-50 skew-x-12 transform origin-top hidden lg:block z-0"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Left: Contact Details -->
          <div>
            <div class="inline-flex items-center gap-2 mb-4">
              <div class="w-8 h-0.5 bg-brand-600"></div>
              <span class="text-brand-700 font-semibold tracking-wider text-sm uppercase">Get in Touch</span>
            </div>
            
            <h2 class="text-4xl font-serif font-bold text-slate-900 mb-6">Let's Discuss Your Dream.</h2>
            <p class="text-slate-600 mb-10 text-lg leading-relaxed">
              Ready to take the next step? Whether you are buying, selling, or just curious about the market, I am here to guide you with integrity and expertise.
            </p>

            <div class="space-y-8">
              
              <!-- Personal Info Card -->
              <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <img [src]="cfg.realtor.avatarUrl" [appFallback]="cfg.branding.logoMark" fallbackFit="contain" alt="" loading="lazy" class="w-20 h-20 rounded-full object-cover border-2 border-slate-100 shadow-md">
                <div>
                  <h3 class="text-xl font-serif font-bold text-slate-900">{{ cfg.realtor.fullName }}</h3>
                  <p class="text-brand-700 font-medium text-sm uppercase tracking-wide mb-2">Realtor® | {{ cfg.realtor.brokerage }}</p>
                  <p class="text-slate-500 text-sm">Top Producer {{ cfg.realtor.topProducerYears.join(', ') }}</p>
                </div>
              </div>

              <!-- Contact Methods -->
              <div class="space-y-6 pl-2">
                <div class="flex items-center gap-5 group">
                  <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <app-icon name="phone"></app-icon>
                  </div>
                  <div>
                    <p class="text-xs text-slate-400 uppercase tracking-wider font-bold">Call / Text</p>
                    <a [href]="'tel:' + cfg.realtor.phone" class="text-lg font-bold text-slate-900 hover:text-brand-700 transition-colors">{{ cfg.realtor.phoneDisplay }}</a>
                  </div>
                </div>

                <div class="flex items-center gap-5 group">
                  <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <app-icon name="mail"></app-icon>
                  </div>
                  <div>
                    <p class="text-xs text-slate-400 uppercase tracking-wider font-bold">Email</p>
                    <a [href]="'mailto:' + cfg.realtor.email" class="text-lg font-bold text-slate-900 hover:text-brand-700 transition-colors">{{ cfg.realtor.email }}</a>
                  </div>
                </div>

                <!-- Social Links -->
                <div class="pt-6 border-t border-slate-100">
                  <p class="text-xs text-slate-400 uppercase tracking-wider font-bold mb-4">Follow My Journey</p>
                  <div class="flex gap-4">
                    <a *ngIf="cfg.socials.instagram" [href]="cfg.socials.instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                       class="w-10 h-10 rounded bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-600 hover:text-white transition-all transform hover:-translate-y-1">
                      <app-icon name="instagram" class="w-5 h-5"></app-icon>
                    </a>
                    <a *ngIf="cfg.socials.facebook" [href]="cfg.socials.facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                       class="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                      <app-icon name="facebook" class="w-5 h-5"></app-icon>
                    </a>
                    <a *ngIf="cfg.socials.linkedin" [href]="cfg.socials.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                       class="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-sky-700 hover:text-white transition-all transform hover:-translate-y-1">
                      <app-icon name="linkedin" class="w-5 h-5"></app-icon>
                    </a>
                    <a *ngIf="cfg.socials.tiktok" [href]="cfg.socials.tiktok" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                       class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-black hover:text-white transition-all transform hover:-translate-y-1">
                      <app-icon name="tiktok" class="w-5 h-5"></app-icon>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Right: Contact Form -->
          <div class="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 relative">
            <div class="absolute top-0 right-0 w-24 h-24 bg-brand-600 rounded-bl-[100px] opacity-10 -z-0"></div>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="relative z-10">
              <h3 class="text-2xl font-serif font-bold text-slate-900 mb-6">Send a Message</h3>

              <!-- Spam trap: off-screen and hidden from screen readers. People never fill it in; bots usually do. -->
              <div class="absolute -left-[10000px] w-px h-px overflow-hidden" aria-hidden="true">
                <label for="contact-website">Website</label>
                <input id="contact-website" type="text" formControlName="website" tabindex="-1" autocomplete="off">
              </div>
              
              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="contact-first-name" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                  <input id="contact-first-name" type="text" formControlName="firstName" autocomplete="given-name" [maxlength]="limits.name" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-200/50 outline-none transition-all placeholder:text-slate-300" placeholder="First Name">
                </div>
                <div>
                  <label for="contact-last-name" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                  <input id="contact-last-name" type="text" formControlName="lastName" autocomplete="family-name" [maxlength]="limits.name" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-200/50 outline-none transition-all placeholder:text-slate-300" placeholder="Last Name">
                </div>
              </div>

              <div class="mb-6">
                <label for="contact-phone" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input id="contact-phone" type="tel" formControlName="phone" autocomplete="tel" [maxlength]="limits.phone"
                       [class.border-red-500]="showError('phone')"
                       [attr.aria-invalid]="showError('phone')"
                       aria-describedby="contact-phone-error"
                       class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-200/50 outline-none transition-all placeholder:text-slate-300" placeholder="(555) 123-4567">
                <div id="contact-phone-error" *ngIf="showError('phone')" class="text-red-500 text-xs mt-1">
                  Please enter a valid phone number (10+ digits)
                </div>
              </div>

              <div class="mb-6">
                <label for="contact-email" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <input id="contact-email" type="email" formControlName="email" autocomplete="email" [maxlength]="limits.email"
                       [class.border-red-500]="showError('email')"
                       [attr.aria-invalid]="showError('email')"
                       class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-200/50 outline-none transition-all placeholder:text-slate-300" placeholder="jane@example.com">
                <div *ngIf="showError('email')" class="text-red-500 text-xs mt-1">Please enter a valid email address</div>
              </div>

              <div class="mb-6">
                <label for="contact-interest" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">I'm interested in...</label>
                <div class="relative">
                  <select id="contact-interest" formControlName="interest" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-200/50 outline-none transition-all appearance-none cursor-pointer text-slate-700">
                    <option value="buying">Buying a Home</option>
                    <option value="selling">Selling a Home</option>
                    <option value="other">General Inquiry</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                    <app-icon name="chevron-down" class="w-5 h-5"></app-icon>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <label for="contact-message" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                <textarea id="contact-message" formControlName="message" rows="4" [maxlength]="limits.message" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-200/50 outline-none transition-all placeholder:text-slate-300" placeholder="How can I help you?"></textarea>
              </div>

              <button type="submit" 
                      [disabled]="contactForm.invalid || isSubmitting()"
                      class="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 group">
                <span *ngIf="isSubmitting()" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                <span *ngIf="!isSubmitting()">Send Message</span>
                <app-icon *ngIf="!isSubmitting()" name="send" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></app-icon>
              </button>
              
              <p *ngIf="submitSuccess()" role="status" class="mt-4 text-green-600 text-center font-medium bg-green-50 py-3 rounded-lg border border-green-100 flex items-center justify-center gap-2 animate-fadeInUp">
                <app-icon name="check" class="w-5 h-5"></app-icon> Message sent successfully!
              </p>
              <p *ngIf="submitError()" role="alert" class="mt-3 text-red-600 text-center font-medium text-sm bg-red-50 py-2 rounded-lg">{{ submitError() }}</p>
            </form>
          </div>

        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  protected cfg = inject(ConfigService).config();
  protected readonly limits = LEAD_LIMITS;

  private fb = inject(FormBuilder).nonNullable;
  private leadService = inject(LeadService);
  private contactIntents = inject(ContactIntentService);
  private sectionNav = inject(SectionNavService);
  private injector = inject(Injector);

  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal('');

  // nonNullable: reset() goes back to these values (so "interest" never becomes null).
  readonly contactForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(LEAD_LIMITS.name)]],
    lastName: ['', [Validators.required, Validators.maxLength(LEAD_LIMITS.name)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(LEAD_LIMITS.email)]],
    phone: ['', [Validators.required, phoneValidator]],
    interest: ['buying' as LeadInterest],
    message: ['', [Validators.required, Validators.maxLength(LEAD_LIMITS.message)]],
    website: [''] // spam trap, see template
  });

  constructor() {
    // Apply "contact me about X" requests from the hero, services cards or a listing page.
    // This section is deferred, so a request may arrive before it exists; the effect
    // picks it up as soon as the form is created, then brings the form into view
    // (sections above may have loaded and pushed it down meanwhile).
    effect(() => {
      const intent = this.contactIntents.pending();
      if (!intent) return;
      untracked(() => {
        this.contactForm.patchValue({ interest: intent.interest });
        if (intent.message) this.contactForm.patchValue({ message: intent.message });
        this.contactIntents.clear();
        afterNextRender(() => this.sectionNav.scrollTo('contact'), { injector: this.injector });
      });
    });
  }

  showError(field: 'phone' | 'email'): boolean {
    const control = this.contactForm.controls[field];
    return control.invalid && control.touched;
  }

  onSubmit() {
    if (this.contactForm.invalid) return;
    this.isSubmitting.set(true);
    this.submitError.set('');
    const { website, ...lead } = this.contactForm.getRawValue();
    this.leadService.submitLead(lead, { honeypot: website })
      .then(() => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.contactForm.reset();
        setTimeout(() => this.submitSuccess.set(false), 5000);
      })
      .catch(err => {
        console.error('Error submitting form', err);
        this.isSubmitting.set(false);
        this.submitError.set("We couldn't send your request. Please try again, or call or email us directly.");
      });
  }
}
