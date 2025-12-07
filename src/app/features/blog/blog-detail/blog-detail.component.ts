import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, DatePipe],
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  
  post$: Observable<any> | undefined;

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      const docRef = doc(this.firestore, `blog_posts/${postId}`);
      this.post$ = docData(docRef);
    }
  }
}