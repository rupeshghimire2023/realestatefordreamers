import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/models';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private firestore = inject(Firestore);

  getPosts(): Observable<BlogPost[]> {
    const blogRef = collection(this.firestore, 'blog_posts');
    const q = query(blogRef, orderBy('date', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<BlogPost[]>;
  }
}