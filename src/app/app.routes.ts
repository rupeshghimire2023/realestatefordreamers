import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { REALTOR_DATA } from './core/config/realtor-data';

const site = REALTOR_DATA.branding.websiteName;

// Home loads eagerly; the other pages are split into their own chunks.
// Listing and blog pages replace the title with the item's name once it loads.
export const routes: Routes = [
  { path: '', component: HomeComponent, title: site },
  {
    path: 'portfolio',
    title: `Portfolio | ${site}`,
    loadComponent: () => import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent)
  },
  {
    path: 'listing/:id',
    title: `Listing | ${site}`,
    loadComponent: () => import('./features/listing-detail/listing-detail.component').then(m => m.ListingDetailComponent)
  },
  {
    path: 'blog',
    title: `Blog | ${site}`,
    loadComponent: () => import('./features/blog/blog-list/blog-list.component').then(m => m.BlogListComponent)
  },
  {
    path: 'blog/:id',
    title: `Blog | ${site}`,
    loadComponent: () => import('./features/blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent)
  },
  { path: '**', redirectTo: '' }
];
