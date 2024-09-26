import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {PhotosService} from "../photos.service";
import {MatCardImage} from "@angular/material/card";
import {PhotoCardComponent} from "../photo-card/photo-card.component";
import {ImageData} from "../types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    MatCardImage,
    PhotoCardComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  protected readonly images = signal<ImageData[]>([]);

  constructor(protected photos: PhotosService, private router: Router) { }

  ngOnInit() {
    this.photos.loadFavorites().subscribe((images) => {
      this.images.update(() => images);
    })
  }

  goToPhoto(id: string) {
    this.router.navigate(['photos', id]);
  }
}
