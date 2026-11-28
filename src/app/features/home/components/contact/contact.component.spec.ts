import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactIntentService } from '../../../../core/services/contact-intent.service';
import { LeadService } from '../../../../core/services/lead.service';

describe('ContactComponent', () => {
  let submitLead: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    submitLead = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideRouter([]), { provide: LeadService, useValue: { submitLead } }]
    });
  });

  it('applies a request made before the form existed (deferred section)', async () => {
    const intents = TestBed.inject(ContactIntentService);
    intents.request({ interest: 'selling', message: 'I am interested in the property: Maple House' });

    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();

    const value = fixture.componentInstance.contactForm.getRawValue();
    expect(value.interest).toBe('selling');
    expect(value.message).toBe('I am interested in the property: Maple House');
    expect(intents.pending()).toBeNull();
  });

  it('applies a request made while the form is on screen', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();

    TestBed.inject(ContactIntentService).request({ interest: 'other' });
    await fixture.whenStable();

    expect(fixture.componentInstance.contactForm.getRawValue().interest).toBe('other');
  });

  it('submits the lead and resets to the default interest', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
    const form = fixture.componentInstance.contactForm;
    form.setValue({
      firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com',
      phone: '(470) 555-0100', interest: 'selling', message: 'Hello', website: ''
    });

    fixture.componentInstance.onSubmit();
    await fixture.whenStable();

    expect(submitLead).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'jane@example.com', interest: 'selling' }),
      { honeypot: '' }
    );
    // The spam-trap field must not reach Firestore (the leads rule only allows known fields).
    expect(submitLead.mock.calls[0][0]).not.toHaveProperty('website');
    expect(form.getRawValue().interest).toBe('buying');
    expect(fixture.componentInstance.submitSuccess()).toBe(true);
  });
});
