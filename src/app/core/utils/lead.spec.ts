import { describeHome } from './lead';

describe('describeHome', () => {
  it('lists the details that were filled in', () => {
    expect(describeHome({ beds: 4, baths: 2.5, sqft: 2500 })).toBe('4 Beds, 2.5 Baths, 2,500 SqFt');
    expect(describeHome({ beds: 3, baths: null, sqft: null })).toBe('3 Beds');
  });

  it('says so when nothing was filled in', () => {
    expect(describeHome({ beds: null, baths: null, sqft: null })).toBe('Not provided');
  });
});
