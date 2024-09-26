import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { MatCard, MatCardImage } from "@angular/material/card";
import {ImageUrlPipe} from "../image-url.pipe";
import {ImageData} from "../types";

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [MatCard, MatCardImage, ImageUrlPipe],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCardComponent {
  @Input({ required: true }) img!: ImageData;
  @Output() loaded = new EventEmitter<string>();
  @Output() onClick = new EventEmitter<string>();

  ngOnInit() {
    this.loaded.emit(this.img?.id);
  }

  clicked() {
    this.onClick.emit(this.img?.id);
  }
}
