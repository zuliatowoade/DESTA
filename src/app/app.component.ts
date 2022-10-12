import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  language = 'en';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {}

  public changeLanguage() {
    if (this.language == 'en') {
      this.router.navigate([''], { queryParams: { locale: 'fr' } });
      this.language = 'fr';
    } else {
      this.router.navigate([''], { queryParams: { locale: 'en' } });
      this.language = 'en';
    }
  }
}
