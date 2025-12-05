import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg [attr.viewBox]="viewBox" [class]="class" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <ng-content></ng-content>
      <!-- Navigation -->
      <path *ngIf="name === 'menu'" d="M4 6h16M4 12h16M4 18h16" />
      <path *ngIf="name === 'x'" d="M18 6L6 18M6 6l12 12" />
      
      <!-- General -->
      <path *ngIf="name === 'search'" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path *ngIf="name === 'home'" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      <path *ngIf="name === 'star'" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      <path *ngIf="name === 'star-filled'" fill="currentColor" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      
      <!-- Contact/Details -->
      <path *ngIf="name === 'phone'" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      <path *ngIf="name === 'mail'" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      <path *ngIf="name === 'map-pin'" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      
      <!-- Real Estate Specific -->
      <path *ngIf="name === 'bed'" d="M22.506 13c.01.07.017.137.017.206v4.667c0 .64-.52 1.127-1.126 1.127h-1.127v-1.667H3.73v1.667H2.604c-.606 0-1.127-.487-1.127-1.127V13.23c0-.07.008-.138.018-.207.01-.26.07-.52.206-.74.197-.33.567-.534 1.137-.534h18.324c.57 0 .94.204 1.137.534.136.22.196.48.207.74zM4.303 10.126c0-1.58 1.11-2.906 2.615-3.176.326-.06.67-.09 1.025-.09.356 0 .7.03 1.026.09 1.505.27 2.615 1.595 2.615 3.175v1.008H4.303v-1.008zm11.26 1.008h7.29v-1.008c0-1.58-1.11-2.906-2.615-3.176-.326-.06-.67-.09-1.025-.09-.355 0-.7.03-1.025.09-1.506.27-2.615 1.595-2.615 3.175v1.008z" />
      <path *ngIf="name === 'bath'" d="M4 12v8m16-8v8M2 10l2-2h16l2 2v2H2v-2z" />
      
      <!-- Chat & Actions -->
      <path *ngIf="name === 'message-circle'" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path *ngIf="name === 'send'" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      <path *ngIf="name === 'check'" d="M20 6L9 17l-5-5" />
      <path *ngIf="name === 'chevron-left'" d="M15 18l-6-6 6-6" />
      <path *ngIf="name === 'chevron-right'" d="M9 18l6-6-6-6" />
      <path *ngIf="name === 'chevron-down'" d="M6 9l6 6 6-6" />

      <!-- Social Media -->
      <path *ngIf="name === 'facebook'" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      <path *ngIf="name === 'instagram'" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21z" />
      <path *ngIf="name === 'linkedin'" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 0 0 1 2-2z" />
      <path *ngIf="name === 'tiktok'" d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v4a9 9 0 0 1-9-9v12z" />
    </svg>
  `
})
export class IconComponent {
  @Input() name: string = '';
  @Input() class: string = 'w-6 h-6';
  @Input() viewBox: string = '0 0 24 24';
}