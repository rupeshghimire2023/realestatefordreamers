import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

/**
 * Renders Markdown (plain text with line breaks works too) to HTML.
 * Always bind the result with [innerHTML]: Angular's sanitizer then strips
 * scripts, event handlers and other unsafe markup.
 */
@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return marked.parse(value, { async: false, gfm: true, breaks: true });
  }
}
