import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { LanguageService } from './shared/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  language: string = 'fr';
  private subscription: Subscription | undefined;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private languageService: LanguageService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subscription = this.languageService.languageSubject.subscribe(
      (language) => {
        this.language = language;
      }
    );
  }

  public changeLanguage() {
    this.languageService.changeLanguage();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
