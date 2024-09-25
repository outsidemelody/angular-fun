import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PhotosComponent } from "./photos/photos.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { PhotoDetailsComponent } from "./photo-details/photo-details.component";

export const routes: Routes = [
  { path: '', title: 'Photo Library', component: PhotosComponent },
  { path: 'favorites', title: 'Favorites', component: FavoritesComponent },
  { path: 'photos/:id', title: 'Photo Details', component: PhotoDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];
