import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuery$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  get searchQuery(): Observable<string> {
    return this.searchQuery$.asObservable();
  }

  setSearchQuery(query: string) {
    this.searchQuery$.next(query);
  }
}
