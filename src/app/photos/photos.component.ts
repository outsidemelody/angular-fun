import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { PhotosService } from "../photos.service";
import { MatCard, MatCardImage } from "@angular/material/card";
import { PhotoCardComponent } from "../photo-card/photo-card.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [MatCard, MatCardImage, PhotoCardComponent, MatIcon],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {
  protected readonly images = signal<string[]>([]);

  constructor(protected photos: PhotosService) {
    this.loadImages();
  }

  private loadImages() {
    this.photos.loadImages().subscribe(images => {
      this.images.update(prev => {
        return [...prev, ...images];
      });
    });
  }

  loaded(img: string) {
    if (this.images().at(-2) === img) {
      this.loadImages();
    }
  }
}
