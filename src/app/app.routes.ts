import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'detail-page',
    loadComponent: () => import('./detail-page/detail-page.page').then( m => m.DetailPagePage)
  },
];
