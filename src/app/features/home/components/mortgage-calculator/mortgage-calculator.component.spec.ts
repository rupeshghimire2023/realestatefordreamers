import { MortgageCalculatorComponent, calculateMonthlyPayment } from './mortgage-calculator.component';

describe('calculateMonthlyPayment', () => {
  it('calculates a standard 30-year payment', () => {
    expect(calculateMonthlyPayment(450000, 90000, 6.5, 30)).toBeCloseTo(2275.44, 2);
  });

  it('returns 0 when the down payment covers the price', () => {
    expect(calculateMonthlyPayment(300000, 300000, 6.5, 30)).toBe(0);
  });

  it('handles a 0% rate', () => {
    expect(calculateMonthlyPayment(360000, 0, 0, 30)).toBe(1000);
  });

  it('returns 0 for incomplete input (an emptied field is null)', () => {
    expect(calculateMonthlyPayment(null, 90000, 6.5, 30)).toBe(0);
    expect(calculateMonthlyPayment(450000, 90000, 6.5, null)).toBe(0);
  });
});

describe('MortgageCalculatorComponent', () => {
  it('recalculates when an input changes', () => {
    const calc = new MortgageCalculatorComponent();
    expect(calc.monthlyPayment()).toBeCloseTo(2275.44, 2);
    calc.termYears.set(15);
    expect(calc.monthlyPayment()).toBeCloseTo(3135.99, 2);
  });
});
