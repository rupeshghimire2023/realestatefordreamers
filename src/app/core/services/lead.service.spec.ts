import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { LeadService } from './lead.service';

describe('LeadService', () => {
  afterEach(() => vi.restoreAllMocks());

  it('sends nothing when the spam trap was filled in', async () => {
    TestBed.configureTestingModule({ providers: [{ provide: Firestore, useValue: {} }] });
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    await TestBed.inject(LeadService).submitLead(
      { firstName: 'Bot', lastName: 'Bot', email: 'bot@example.com', phone: '4705550100', interest: 'other', message: 'spam' },
      { honeypot: 'http://spam.example' }
    );

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
