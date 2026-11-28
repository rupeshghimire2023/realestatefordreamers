import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, doc, docData, orderBy, query } from '@angular/fire/firestore';
import { Observable, catchError, defer, map, of } from 'rxjs';
import { BlogPost } from '../models/models';
import { toDate } from '../utils/firestore-date';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private firestore = inject(Firestore);

  /** Posts newest first (live). Emits [] if Firestore can't be reached or denies access. */
  getPosts(): Observable<BlogPost[]> {
    const q = query(collection(this.firestore, 'blog_posts'), orderBy('date', 'desc'));
    return collectionData(q, { idField: 'id' }).pipe(
      map(docs => docs.map(toBlogPost)),
      catchError(err => {
        console.error('Error loading blog posts:', err);
        return of([]);
      })
    );
  }

  /** One post (live), or null if it doesn't exist or the id is malformed. */
  getPost(id: string): Observable<BlogPost | null> {
    return defer(() => docData(doc(this.firestore, 'blog_posts', id), { idField: 'id' })).pipe(
      map(data => (data ? toBlogPost(data) : null)),
      catchError(err => {
        console.error(`Error loading blog post "${id}":`, err);
        return of(null);
      })
    );
  }
}

function toBlogPost(data: DocumentData): BlogPost {
  return { ...data, date: toDate(data['date']) } as BlogPost;
}
