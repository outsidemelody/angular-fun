import { Injectable } from '@angular/core';
import { from, mergeMap, Observable, toArray } from "rxjs";
import { ImageData } from "./types";
import { PhotosService } from "./photos.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'ang-favorites';

  constructor(private photos: PhotosService, private localStorage: LocalStorageService) { }

  loadFavorites(): Observable<ImageData[]> {
    return from(this.getFavorites()).pipe(
      mergeMap((id) => this.photos.loadImage(id)),
      toArray(),
    )
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
