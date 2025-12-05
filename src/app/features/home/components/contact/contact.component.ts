import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { LeadService } from '../../../../core/services/lead.service';

@Component({
  selector: 'app-home-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  template: `
    <section id="contact" class="py-24 bg-white relative overflow-hidden">
      <!-- Decorative Background -->
      <div class="absolute right-0 top-0 w-1/3 h-full bg-slate-50 skew-x-12 transform origin-top hidden lg:block z-0"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Left: Contact Details -->
          <div>
            <div class="inline-flex items-center gap-2 mb-4">
              <div class="w-8 h-0.5 bg-amber-500"></div>
              <span class="text-amber-600 font-semibold tracking-wider text-sm uppercase">Get in Touch</span>
            </div>
            
            <h2 class="text-4xl font-serif font-bold text-slate-900 mb-6">Let's Discuss Your Dream.</h2>
            <p class="text-slate-600 mb-10 text-lg leading-relaxed">
              Ready to take the next step? Whether you are buying, selling, or just curious about the market, I am here to guide you with integrity and expertise.
            </p>

            <div class="space-y-8">
              
              <!-- Personal Info Card -->
              <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <img src="https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_profile.JPG?alt=media&token=fbb83206-b27a-4eb2-9262-cd3f3c0af8c7" class="w-20 h-20 rounded-full object-cover border-2 border-slate-100 shadow-md">
                <div>
                  <h3 class="text-xl font-serif font-bold text-slate-900">Kritika Katwal</h3>
                  <p class="text-amber-600 font-medium text-sm uppercase tracking-wide mb-2">Realtor® | Main Street Realty Group</p>
                  <p class="text-slate-500 text-sm">Top Producer 2022, 2023, 2024</p>
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
                    <a href="tel:+14706526362" class="text-lg font-bold text-slate-900 hover:text-amber-600 transition-colors">(470) 652-6362</a>
                  </div>
                </div>

                <div class="flex items-center gap-5 group">
                  <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <app-icon name="mail"></app-icon>
                  </div>
                  <div>
                    <p class="text-xs text-slate-400 uppercase tracking-wider font-bold">Email</p>
                    <a href="mailto:realestatefordreamers@gmail.com" class="text-lg font-bold text-slate-900 hover:text-amber-600 transition-colors">realestatefordreamers@gmail.com</a>
                  </div>
                </div>

                <!-- Social Links -->
                <div class="pt-6 border-t border-slate-100">
                  <p class="text-xs text-slate-400 uppercase tracking-wider font-bold mb-4">Follow My Journey</p>
                  <div class="flex gap-4">
                    <a href="https://www.instagram.com/realestatefordreamers/" target="_blank" class="w-10 h-10 rounded bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white transition-all transform hover:-translate-y-1">
                      <app-icon name="instagram" class="w-5 h-5"></app-icon>
                    </a>
                    <a href="https://www.facebook.com/p/Real-Estate-for-Dreamers-100079074604797" target="_blank"  class="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                      <app-icon name="facebook" class="w-5 h-5"></app-icon>
                    </a>
                    <a href="https://www.tiktok.com" target="_blank"  class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-black hover:text-white transition-all transform hover:-translate-y-1">
                      <app-icon name="tiktok" class="w-5 h-5"></app-icon>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Right: Contact Form -->
          <div class="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 relative">
            <div class="absolute top-0 right-0 w-24 h-24 bg-amber-500 rounded-bl-[100px] opacity-10 -z-0"></div>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="relative z-10">
              <h3 class="text-2xl font-serif font-bold text-slate-900 mb-6">Send a Message</h3>
              
              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" formControlName="firstName" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 outline-none transition-all placeholder:text-slate-300" placeholder="First Name">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" formControlName="lastName" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 outline-none transition-all placeholder:text-slate-300" placeholder="Last Name">
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input type="tel" formControlName="phone" 
                       [class.border-red-500]="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched"
                       class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 outline-none transition-all placeholder:text-slate-300" placeholder="(555) 123-4567">
                <div *ngIf="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched" class="text-red-500 text-xs mt-1">
                  Please enter a valid phone number (10+ digits)
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" formControlName="email" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 outline-none transition-all placeholder:text-slate-300" placeholder="jane@example.com">
              </div>

              <div class="mb-6">
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">I'm interested in...</label>
                <div class="relative">
                  <select formControlName="interest" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 outline-none transition-all appearance-none cursor-pointer text-slate-700">
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
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                <textarea formControlName="message" rows="4" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 outline-none transition-all placeholder:text-slate-300" placeholder="How can I help you?"></textarea>
              </div>

              <button type="submit" 
                      [disabled]="contactForm.invalid || isSubmitting"
                      class="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 group">
                <span *ngIf="isSubmitting" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                <span *ngIf="!isSubmitting">Send Message</span>
                <app-icon *ngIf="!isSubmitting" name="send" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></app-icon>
              </button>
              
              <p *ngIf="submitSuccess" class="mt-4 text-green-600 text-center font-medium bg-green-50 py-3 rounded-lg border border-green-100 flex items-center justify-center gap-2 animate-fadeInUp">
                <app-icon name="check" class="w-5 h-5"></app-icon> Message sent successfully!
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private leadService = inject(LeadService);
  
  isSubmitting = false;
  submitSuccess = false;
  contactForm: FormGroup;

  constructor() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$'), Validators.minLength(10)]], // Added Pattern and Length Validation
      interest: ['buying'],
      message: ['', Validators.required]
    });
  }

  setInterest(interest: string, message?: string) {
    this.contactForm.patchValue({ interest });
    if (message) {
      this.contactForm.patchValue({ message });
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      const formData = this.contactForm.value;
      this.leadService.submitLead(formData)
        .then(() => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
          setTimeout(() => this.submitSuccess = false, 5000);
        })
        .catch(err => {
          console.error('Error submitting form', err);
          this.isSubmitting = false;
        });
    }
  }
}