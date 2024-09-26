import { Injectable } from '@angular/core';
import { catchError, defer, delay, EMPTY, from, map, mergeMap, Observable, toArray } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
import { ImageData } from "./types";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private numberOfImages = 18;
  private storageKey = 'ang-favorites';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  getRandomImageId(): string {
    return `${Math.floor(Math.random() * 1001)}`;
  }

  loadRandomImages(): Observable<ImageData[]> {
    return from(Array.from({ length: this.numberOfImages })).pipe(
      mergeMap(() => this.loadImage(this.getRandomImageId())),
      toArray()
    );
  }

  loadFavorites(): Observable<ImageData[]> {
    return from(this.getFavorites()).pipe(
      mergeMap((id) => this.loadImage(id)),
      toArray(),
    )
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

  addFavorite(id: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(id)) {
      this.localStorage.setItem(this.storageKey, [id, ...favorites]);
    }
  }

  removeFavorite(id?: string): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav !== id);
    this.localStorage.setItem(this.storageKey, favorites);
  }

  getFavorites(): string[] {
    return this.localStorage.getItem(this.storageKey) || [];
  }

  isFavorite(id?: string): boolean {
    const favorites = this.getFavorites();
    return !!id && favorites.includes(id);
  }
}
