import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ImgFallbackDirective } from './img-fallback.directive';

@Component({
  imports: [ImgFallbackDirective],
  template: `
    <img id="photo" src="/missing.jpg" appFallback="/assets/images/photo-placeholder.svg">
    <img id="avatar" src="/missing-avatar.jpg" appFallback="/assets/logo.png" fallbackFit="contain">
  `
})
class HostComponent {}

describe('ImgFallbackDirective', () => {
  const setup = async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    return (id: string) => fixture.nativeElement.querySelector(`#${id}`) as HTMLImageElement;
  };

  it('swaps a broken image for the fallback', async () => {
    const img = (await setup())('photo');
    img.dispatchEvent(new Event('error'));
    expect(img.getAttribute('src')).toBe('/assets/images/photo-placeholder.svg');
    expect(img.style.objectFit).toBe('');
  });

  it('shows a logo fallback whole, on white', async () => {
    const img = (await setup())('avatar');
    img.dispatchEvent(new Event('error'));
    expect(img.getAttribute('src')).toBe('/assets/logo.png');
    expect(img.style.objectFit).toBe('contain');
  });

  it('stops if the fallback itself fails (no loop)', async () => {
    const img = (await setup())('photo');
    img.dispatchEvent(new Event('error'));
    img.dispatchEvent(new Event('error'));
    expect(img.getAttribute('src')).toBe('/assets/images/photo-placeholder.svg');
  });
});
