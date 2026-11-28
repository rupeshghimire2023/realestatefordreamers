import { Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Replaces a broken image with a fallback, so visitors never see the browser's
 * broken-image icon (e.g. when a photo link in Firestore stops working):
 *
 *   <img [src]="listing.imageUrl" appFallback="/assets/images/photo-placeholder.svg">
 *
 * fallbackFit="contain" shows the whole fallback on white, for a logo standing
 * in for a photo. If the fallback itself fails, it stops there (no loop).
 */
@Directive({
  selector: 'img[appFallback]',
  host: { '(error)': 'onError()', '(load)': 'onLoad()' }
})
export class ImgFallbackDirective {
  readonly appFallback = input.required<string>();
  readonly fallbackFit = input<'cover' | 'contain'>('cover');

  private img = inject<ElementRef<HTMLImageElement>>(ElementRef).nativeElement;

  onError() {
    const fallback = this.appFallback();
    if (!fallback || this.img.getAttribute('src') === fallback) return;
    this.img.src = fallback;
    if (this.fallbackFit() === 'contain') {
      this.img.style.objectFit = 'contain';
      this.img.style.backgroundColor = '#ffffff';
    }
  }

  // If the same <img> later gets a working photo, undo the fallback styling.
  onLoad() {
    if (this.img.getAttribute('src') !== this.appFallback()) {
      this.img.style.objectFit = '';
      this.img.style.backgroundColor = '';
    }
  }
}
