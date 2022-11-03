import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BusinessInfo } from './business-info-model';

@Injectable({
  providedIn: 'root',
})
export class ReadCsvService {
  private _companies: BusinessInfo[] = [];

  get companies() {
    return this._companies.slice();
  }

  set companies(companies) {
    this._companies = companies;
  }

  constructor(private httpClient: HttpClient) {}

  fetchDataFromCsv() {
    return this.httpClient
      .get('assets/desta.csv', { responseType: 'text' })
      .pipe(
        tap((data) => {
          this._companies.length = 0;
          let csvToRowArray = data.split('\n');

          csvToRowArray.forEach((row, index) => {
            if (index === 0) {
              return;
            }
            const businessInfoArray = row.trim().split('|');
            this._companies.push(
              new BusinessInfo(
                businessInfoArray[0],
                businessInfoArray[1],
                businessInfoArray[2],
                businessInfoArray[3],
                businessInfoArray[4],
                businessInfoArray[5],
                businessInfoArray[6],
                businessInfoArray[7],
                businessInfoArray[8],
                businessInfoArray[9],
                businessInfoArray[10],
                businessInfoArray[11],
                businessInfoArray[12],
                businessInfoArray[13].split(','),
                businessInfoArray[14]
              )
            );
          });
        })
      );
  }
}
