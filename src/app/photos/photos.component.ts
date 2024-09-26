import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { PhotosService } from "../photos.service";
import { MatCard, MatCardImage } from "@angular/material/card";
import { PhotoCardComponent } from "../photo-card/photo-card.component";
import {MatIcon} from "@angular/material/icon";
import {ImageData} from "../types";
import {FavoritesService} from "../favorites.service";

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [MatCard, MatCardImage, PhotoCardComponent, MatIcon],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {
  constructor(protected photos: PhotosService, protected favorites: FavoritesService) {
    this.loadImages();
  }

  private loadImages() {
    this.photos.loadRandomImages().subscribe();
  }

  loaded(id: string) {
    if (this.photos.imagesCache().at(-2)?.id === id) {
      this.loadImages();
    }
  }

  addToFavorites(id: string) {
    this.favorites.addFavorite(id);
  }
}
