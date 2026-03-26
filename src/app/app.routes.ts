import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home — test-web-001',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About — test-web-001',
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features/features.component').then(m => m.FeaturesComponent),
    title: 'Features — test-web-001',
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Gallery — test-web-001',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact — test-web-001',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
