import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-home-mortgage-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <section id="calculator" class="py-24 bg-slate-900 relative overflow-hidden">
      
      <!-- Ambient Background Effects -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Left Side: Text & Result -->
          <div>
            <div class="inline-flex items-center gap-2 mb-4">
              <div class="w-8 h-0.5 bg-amber-500"></div>
              <span class="text-amber-500 font-bold tracking-widest text-sm uppercase">Financial Clarity</span>
            </div>
            
            <h2 class="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Plan Your Future <br/> With Confidence.
            </h2>
            <p class="text-slate-400 mb-10 leading-relaxed text-lg">
              Understanding your budget is the first step toward ownership. Use our estimator to see what a monthly investment in your dream home looks like.
            </p>
            
            <!-- Result Card -->
            <div class="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <app-icon name="home" class="w-24 h-24 text-white"></app-icon>
              </div>
              
              <p class="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Estimated Monthly Payment</p>
              <div class="flex items-baseline gap-1">
                <span class="text-5xl md:text-6xl font-bold text-white tracking-tight">
                  \${{ monthlyPayment | number:'1.0-0' }}
                </span>
                <span class="text-slate-500 text-xl">/mo</span>
              </div>
              
              <div class="mt-6 pt-6 border-t border-slate-700/50 flex flex-col gap-2">
                <div class="flex justify-between text-sm text-slate-400">
                  <span>Principal & Interest</span>
                  <span class="text-white font-bold">\${{ monthlyPayment | number:'1.0-0' }}</span>
                </div>
                <p class="text-[10px] text-slate-500 mt-2 italic">
                  *Estimate for principal and interest only. Taxes and insurance vary by location.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Side: Calculator Form -->
          <div class="bg-white p-8 md:p-10 rounded-3xl shadow-2xl relative">
            <div class="space-y-8">
              
              <!-- Home Price Input -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Home Price</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span class="text-slate-400 font-serif text-lg group-focus-within:text-amber-500 transition-colors">$</span>
                  </div>
                  <input type="number" [(ngModel)]="calcPrice" (input)="calculateMortgage()" 
                         class="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-amber-500 focus:ring-0 outline-none font-bold text-slate-900 text-lg transition-all placeholder:text-slate-300">
                </div>
                <input type="range" min="100000" max="2000000" step="5000" [(ngModel)]="calcPrice" (input)="calculateMortgage()"
                       class="w-full mt-3 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500">
              </div>

              <!-- Down Payment Input -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Down Payment</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span class="text-slate-400 font-serif text-lg group-focus-within:text-amber-500 transition-colors">$</span>
                  </div>
                  <input type="number" [(ngModel)]="calcDownPayment" (input)="calculateMortgage()"
                         class="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-amber-500 focus:ring-0 outline-none font-bold text-slate-900 text-lg transition-all">
                </div>
              </div>

              <!-- Split Inputs -->
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Interest Rate</label>
                  <div class="relative group">
                    <input type="number" step="0.1" [(ngModel)]="calcInterest" (input)="calculateMortgage()"
                           class="w-full pl-4 pr-8 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-amber-500 focus:ring-0 outline-none font-bold text-slate-900 text-lg transition-all">
                    <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span class="text-slate-400 font-bold group-focus-within:text-amber-500 transition-colors">%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Loan Term</label>
                  <div class="relative">
                    <select [(ngModel)]="calcTerm" (change)="calculateMortgage()"
                            class="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-amber-500 focus:ring-0 outline-none font-bold text-slate-900 text-lg appearance-none transition-all cursor-pointer">
                      <option [value]="30">30 Years</option>
                      <option [value]="15">15 Years</option>
                      <option [value]="10">10 Years</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                      <app-icon name="chevron-down" class="w-5 h-5"></app-icon>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class MortgageCalculatorComponent implements OnInit {
  calcPrice = 450000;
  calcDownPayment = 90000;
  calcInterest = 6.5;
  calcTerm = 30;
  monthlyPayment = 0;

  ngOnInit() {
    this.calculateMortgage();
  }

  calculateMortgage() {
    const principal = this.calcPrice - this.calcDownPayment;
    const monthlyInterest = this.calcInterest / 100 / 12;
    const numberOfPayments = this.calcTerm * 12;
    
    if (principal > 0 && this.calcInterest > 0 && this.calcTerm > 0) {
      this.monthlyPayment = principal * (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) / 
                            (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);
    } else {
      this.monthlyPayment = 0;
    }
  }
}