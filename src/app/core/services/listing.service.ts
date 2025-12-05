import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc } from '@angular/fire/firestore'; // Added addDoc
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Property, Testimonial } from '../models/models';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListingService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  
  // --- LISTINGS ---
  getListings(): Observable<Property[]> {
    const listingsCollection = collection(this.firestore, 'listings');
    return collectionData(listingsCollection, { idField: 'id' }) as Observable<Property[]>;
  }

  getListingById(id: string): Observable<Property> {
    const listingDoc = doc(this.firestore, `listings/${id}`);
    return docData(listingDoc, { idField: 'id' }) as Observable<Property>;
  }

  // --- TESTIMONIALS ---
  getTestimonials(): Observable<Testimonial[]> {
    const testimonialsCollection = collection(this.firestore, 'testimonials');
    return collectionData(testimonialsCollection, { idField: 'id' }) as Observable<Testimonial[]>;
  }

  // --- NEW: SEEDER FUNCTION ---
  // This allows us to push a single testimonial to Firebase
  // addTestimonial(t: Testimonial) {
  //   const testimonialsCollection = collection(this.firestore, 'testimonials');
  //   // We delete the 'id' because Firebase generates a new unique ID automatically
  //   const { id, ...data } = t; 
  //   return addDoc(testimonialsCollection, data);
  // }

  // --- IMAGE UPLOAD HELPER ---
  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(
      switchMap((result) => getDownloadURL(result.ref))
    );
  }
}