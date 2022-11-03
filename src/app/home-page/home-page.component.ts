import {
  BehaviorSubject,
  filter,
  Observable,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { BusinessInfo } from '../shared/business-info-model';
import { ReadCsvService } from '../shared/read-csv.service';
import { LanguageService } from '../shared/language.service';
import { MyFilterPipe } from '../shared/filter.pipe';
import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  language: string = 'fr';
  private subscriptions: Subscription[] = [];
  public companies: BusinessInfo[] = [];
  query$: Observable<string>;
  value: string = '';
  isSorted: boolean = false;

  constructor(
    private readCsvService: ReadCsvService,
    private languageService: LanguageService,
    private searchService: SearchService
  ) {
    this.query$ = this.searchService.searchQuery;
  }

  ngOnInit(): void {
    this.companies = this.readCsvService.companies;
    if (!this.companies?.length) {
      this.subscriptions.push(
        this.readCsvService.fetchDataFromCsv().subscribe(() => {
          this.companies = this.readCsvService.companies;
        })
      );
    }

    this.subscriptions.push(
      this.languageService.languageSubject.subscribe((language) => {
        this.language = language;
      })
    );
  }

  sort() {
    if (this.isSorted) {
      this.companies = this.readCsvService.companies;
    } else {
      this.companies.sort((c1, c2) =>
        c1.name.toLowerCase().localeCompare(c2.name.toLowerCase())
      );
    }

    this.isSorted = !this.isSorted;
  }

  clearSearch() {
    this.value = '';
    this.sendQuery();
  }

  sendQuery() {
    this.searchService.setSearchQuery(this.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
