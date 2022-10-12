import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessInfo } from '../business-info-model';
import { ReadCsvService } from '../read-csv.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  language = 'en';
  public companies: BusinessInfo[] = [];

  constructor(private readCsvService: ReadCsvService) {}

  ngOnInit(): void {
    this.companies = this.readCsvService.companies;
    if (!this.companies?.length) {
      this.readCsvService.fetchDataFromCsv().subscribe(() => {
        this.companies = this.readCsvService.companies;
      });
    }
  }
}
