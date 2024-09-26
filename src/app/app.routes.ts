import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PhotosComponent } from "./photos/photos.component";

export const routes: Routes = [
  { path: '', title: 'Photo Library', component: PhotosComponent },
  { path: 'favorites', title: 'Favorites', loadComponent: () =>
      import('./favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
  { path: 'photos/:id', title: 'Photo Details', loadComponent: () =>
      import('./photo-details/photo-details.component').then((m) => m.PhotoDetailsComponent),
  },
  { path: '**', component: PageNotFoundComponent }
];
