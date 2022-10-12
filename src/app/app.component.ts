import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { BusinessInfo } from './business-info-model';
import { Router } from '@angular/router';
import { ReadCsvService } from './read-csv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  language = 'en';
  public companies: BusinessInfo[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    private readCsvService: ReadCsvService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.companies = this.readCsvService.companies;
    if (!this.companies?.length) {
      this.readCsvService.fetchDataFromCsv().subscribe(() => {
        this.companies = this.readCsvService.companies;
      });
    }
  }

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
