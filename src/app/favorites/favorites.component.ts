import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatCardImage} from "@angular/material/card";
import {PhotoCardComponent} from "../photo-card/photo-card.component";
import {ImageData} from "../types";
import {Router} from "@angular/router";
import {FavoritesService} from "../favorites.service";

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

  constructor(private router: Router, private favorites: FavoritesService) { }

  ngOnInit() {
    this.favorites.loadFavorites().subscribe((images) => {
      this.images.update(() => images);
    })
  }

  goToPhoto(id: string) {
    this.router.navigate(['photos', id]);
  }
}
