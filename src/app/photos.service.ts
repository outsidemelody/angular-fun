import { Injectable, signal } from '@angular/core';
import { catchError, defer, delay, EMPTY, from, map, mergeMap, Observable, tap, toArray } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ImageData } from "./types";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  readonly imagesCache = signal<ImageData[]>([]);
  private numberOfImages = 21;

  constructor(private http: HttpClient) { }

  getRandomImageId(): string {
    return `${Math.floor(Math.random() * 1001)}`;
  }

  loadRandomImages(): Observable<ImageData[]> {
    return from(Array.from({ length: this.numberOfImages })).pipe(
      mergeMap(() => this.loadImage(this.getRandomImageId())),
      tap((v) => {
        this.imagesCache.update((p) => [...p, v])
      }),
      toArray(),
    );
  }

  loadImage(imgId: string): Observable<ImageData> {
    return defer(() => {
      const imgUrl = `https://picsum.photos/id/${imgId}/200/300`;
      const randomDelay = Math.floor(Math.random() * 101) + 500;
      return this.http.get(imgUrl, { responseType: 'blob' }).pipe(
        delay(randomDelay),
        map((blob) => ({ id: imgId, src: URL.createObjectURL(blob) })),
        catchError(() => EMPTY)
      );
    });
  }
}
