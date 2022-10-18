import {
  BehaviorSubject,
  filter,
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
  filterargs = '';
  public companies: BusinessInfo[] = [];
  private _ngUnsubscribe$: Subject<any> = new Subject();

  constructor(
    private readCsvService: ReadCsvService,
    private languageService: LanguageService,
    private searchService: SearchService
  ) {}

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
    this.searchService.searchQuery
      .pipe(takeUntil(this._ngUnsubscribe$))
      .subscribe((query) => {
        this.filterargs = query;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
