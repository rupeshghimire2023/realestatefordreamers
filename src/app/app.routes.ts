import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ListingDetailComponent } from './features/listing-detail/listing-detail.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'listing/:id', component: ListingDetailComponent },
  { path: '**', redirectTo: '' }
];