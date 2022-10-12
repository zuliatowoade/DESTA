import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../shared/language.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
})
export class CompanyInfoComponent implements OnInit, OnDestroy {
  language: string = 'fr';
  private subscription: Subscription | undefined;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
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
