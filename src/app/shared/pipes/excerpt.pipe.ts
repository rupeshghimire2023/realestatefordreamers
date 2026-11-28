import { Pipe, PipeTransform } from '@angular/core';
import { toPlainText } from '../../core/utils/text';

/** Plain-text preview of Markdown content, for cards and teasers. */
@Pipe({ name: 'excerpt' })
export class ExcerptPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return toPlainText(value);
  }
}
