import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { MatCard, MatCardImage } from "@angular/material/card";
import {ImageUrlPipe} from "../image-url.pipe";

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [MatCard, MatCardImage, ImageUrlPipe],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCardComponent {
  @Input({ required: true }) img!: string;
  @Output() loaded = new EventEmitter<string>();
  @Output() click = new EventEmitter<string>();

  ngOnInit() {
    this.loaded.emit(this.img);
  }

  clicked() {
    this.click.emit(this.img);
  }
}
