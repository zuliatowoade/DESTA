import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../shared/language.service';
import { ReadCsvService } from '../shared/read-csv.service';
import { BusinessInfo } from '../shared/business-info-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
})
export class CompanyInfoComponent implements OnInit, OnDestroy {
  language: string = 'fr';
  company: BusinessInfo | undefined;
  private subscriptions: Subscription[] = [];

  constructor(
    private readCsvService: ReadCsvService,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe((paramMap) => {
        const companyId = paramMap.get('id');
        if (companyId) {
          this.loadCompanyInfo(+companyId);
        }
      })
    );

    this.subscriptions.push(
      this.languageService.languageSubject.subscribe((language) => {
        this.language = language;
      })
    );
  }
  loadCompanyInfo(id: number) {
    this.company = this.readCsvService.companies[id];
    if (!this.company) {
      this.readCsvService.fetchDataFromCsv().subscribe(() => {
        this.company = this.readCsvService.companies[id];
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
