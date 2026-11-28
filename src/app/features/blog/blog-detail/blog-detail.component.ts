import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith, switchMap } from 'rxjs';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ConfigService } from '../../../core/services/config.service';
import { BlogService } from '../../../core/services/blog.service';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule, RouterModule, IconComponent, MarkdownPipe],
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent {
  private configService = inject(ConfigService);
  protected cfg = this.configService.config();
  private blogService = inject(BlogService);

  /** undefined while loading, null if there's no post with this id. */
  readonly post = toSignal(
    inject(ActivatedRoute).paramMap.pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => this.blogService.getPost(id).pipe(startWith(undefined)))
    ),
    { initialValue: undefined }
  );

  constructor() {
    const title = inject(Title);
    effect(() => {
      const post = this.post();
      if (post) title.setTitle(this.configService.pageTitle(post.title));
      else if (post === null) title.setTitle(this.configService.pageTitle('Article not found'));
    });
  }
}
