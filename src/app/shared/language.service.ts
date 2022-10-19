import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _language = 'fr';
  public languageSubject = new BehaviorSubject(this._language);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public changeLanguage() {
    this._language = this._language == 'en' ? 'fr' : 'en';
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { locale: this._language },
    });
    this.languageSubject.next(this._language);
  }
}
