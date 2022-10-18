import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { LanguageService } from './shared/language.service';
import { BusinessInfo } from './shared/business-info-model';
import { ReadCsvService } from './shared/read-csv.service';
import { SearchService } from './shared/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  // @Output() public found = new EventEmitter<>();
  language: string = 'fr';
  private subscriptions: Subscription[] = [];
  public companies: BusinessInfo[] = [];
  filterargs = 'DESTA';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private readCsvService: ReadCsvService,
    private languageService: LanguageService,
    private searchService: SearchService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.languageService.languageSubject.subscribe((language) => {
        this.language = language;
      })
    );

    this.companies = this.readCsvService.companies;
    if (!this.companies?.length) {
      this.subscriptions.push(
        this.readCsvService.fetchDataFromCsv().subscribe(() => {
          this.companies = this.readCsvService.companies;
        })
      );
    }
  }

  public changeLanguage() {
    this.languageService.changeLanguage();
  }

  sendQuery($event: any) {
    this.searchService.setSearchQuery($event.target.value);
    console.log($event.target.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  // filter () :any {
  //   this.found.emit(this.filterargs)

  // }
}
