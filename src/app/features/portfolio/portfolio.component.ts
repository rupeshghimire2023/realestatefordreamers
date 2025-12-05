import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListingService } from '../../core/services/listing.service';
import { Property } from '../../core/models/models';
import { IconComponent } from '../../shared/components/icon/icon.component';
// Ensure Skeleton is imported if you are using it
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component'; 

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, SkeletonComponent],
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  private listingService = inject(ListingService);
  
  listings: Property[] = [];
  isLoading = true; // 1. Start as true

  ngOnInit() {
    this.listingService.getListings().subscribe({
      next: (data) => {
        this.listings = data;
        this.isLoading = false; // 2. Stop loading when data arrives (even if empty)
      },
      error: (err) => {
        console.error('Error fetching listings:', err);
        this.isLoading = false; // 3. Stop loading on error so UI doesn't freeze
      }
    });
  }
}