import { Injectable } from '@angular/core';
import { delay, from, map, mergeMap, Observable, toArray } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private imageUrl = `https://picsum.photos/200/300`;
  private numberOfImages = 8;

  constructor(private http: HttpClient) { }

  loadImages(): Observable<string[]> {
    return from(Array.from({ length: this.numberOfImages })).pipe(
      mergeMap(() => {
        const randomDelay = Math.floor(Math.random() * 101) + 200;
        return this.http.get(this.imageUrl, { responseType: 'blob' }).pipe(
          delay(randomDelay),
          map((blob) => URL.createObjectURL(blob))
        );
      }),
      toArray()
    );
  }
}
