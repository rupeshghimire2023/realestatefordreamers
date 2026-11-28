import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListingService } from '../../core/services/listing.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, RouterModule, IconComponent, SkeletonComponent, ImgFallbackDirective],
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent {
  /** undefined while loading; [] if there are none (or they couldn't be loaded). */
  readonly listings = toSignal(inject(ListingService).getListings());
}
