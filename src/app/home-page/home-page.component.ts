import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { BusinessInfo } from '../shared/business-info-model';
import { ReadCsvService } from '../shared/read-csv.service';
import { LanguageService } from '../shared/language.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  language: string = 'fr';
  private subscription: Subscription | undefined;
  public companies: BusinessInfo[] = [];

  constructor(
    private readCsvService: ReadCsvService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.companies = this.readCsvService.companies;
    if (!this.companies?.length) {
      this.readCsvService.fetchDataFromCsv().subscribe(() => {
        this.companies = this.readCsvService.companies;
      });
    }

    this.subscription = this.languageService.languageSubject.subscribe(
      (language) => {
        this.language = language;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
