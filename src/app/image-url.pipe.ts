import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  public transform(blob: Blob): string {
    console.log(blob)
    return URL.createObjectURL(blob);
  }
}
