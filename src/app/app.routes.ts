import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ListingDetailComponent } from './features/listing-detail/listing-detail.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { BlogListComponent } from './features/blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './features/blog/blog-detail/blog-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'listing/:id', component: ListingDetailComponent },
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogListComponent }, // NEW ROUTE
  { path: 'blog/:id', component: BlogDetailComponent }, // <--- THIS WAS MISSING
  { path: '**', redirectTo: '' }
];