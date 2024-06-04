import {Routes} from '@angular/router';
import {SearchComponent} from './pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent),
  },
  {
    path: 'favorite',
    loadComponent: () =>
      import('./pages/favorite/favorite.component').then((m) => m.FavoriteComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
