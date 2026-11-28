import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  imports: [CommonModule],
  template: `
    <div [class]="className + ' animate-pulse bg-slate-200 rounded'"></div>
  `
})
export class SkeletonComponent {
  @Input() className = '';
}