import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable, catchError, defer, map, of } from 'rxjs';
import { Property, Testimonial } from '../models/models';
import { toDate } from '../utils/firestore-date';

@Injectable({ providedIn: 'root' })
export class ListingService {
  private firestore = inject(Firestore);

  /** All listings (live). Emits [] if Firestore can't be reached or denies access. */
  getListings(): Observable<Property[]> {
    return collectionData(collection(this.firestore, 'listings'), { idField: 'id' }).pipe(
      map(docs => docs.map(toProperty)),
      catchError(err => {
        console.error('Error loading listings:', err);
        return of([]);
      })
    );
  }

  /** One listing (live), or null if it doesn't exist or the id is malformed. */
  getListingById(id: string): Observable<Property | null> {
    // defer() turns an invalid id (which makes doc() throw) into an error we can catch.
    return defer(() => docData(doc(this.firestore, 'listings', id), { idField: 'id' })).pipe(
      map(data => (data ? toProperty(data) : null)),
      catchError(err => {
        console.error(`Error loading listing "${id}":`, err);
        return of(null);
      })
    );
  }

  getTestimonials(): Observable<Testimonial[]> {
    return collectionData(collection(this.firestore, 'testimonials'), { idField: 'id' }).pipe(
      map(docs => docs as Testimonial[]),
      catchError(err => {
        console.error('Error loading testimonials:', err);
        return of([]);
      })
    );
  }
}

function toProperty(data: DocumentData): Property {
  return {
    ...data,
    launchDate: toDate(data['launchDate']),
    soldDate: toDate(data['soldDate'])
  } as Property;
}
