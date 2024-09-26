import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {PhotosService} from "../photos.service";
import {ImageData} from "../types";

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [MatButton],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetailsComponent {
  protected readonly image = signal<ImageData>(null);

  constructor(private router: Router, private route: ActivatedRoute, private photos: PhotosService) { }

  ngOnInit() {
    const imgId = this.route.snapshot.paramMap.get('id') ?? '';
    this.photos.loadImage(imgId).subscribe((imgData) => {
      this.image.update(() => imgData);
    })
  }

  removeFavorite() {
    this.photos.removeFavorite(this.image()?.id);
    this.router.navigate(['/favorites'])
  }
}
