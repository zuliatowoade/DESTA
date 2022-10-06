import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AddressModel } from './address.model';
import { BusinessInfo } from './business-info-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  language = 'en';

  public addresses: AddressModel[] = [];
  public companies: BusinessInfo[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      var testValue = params.get('locale');
      console.log(testValue);
      console.log(params.get('locale'));
    });
    this.httpClient
      .get('assets/desta.csv', { responseType: 'text' })
      .subscribe((data) => {
        let csvToRowArray = data.split('\n');

        let headers = csvToRowArray[0].trim().split(', ');
        console.log(headers);

        csvToRowArray.forEach((row, index) => {
          if (index === 0) {
            return;
          }
          const businessInfoArray = row.trim().split('|');
          this.companies.push(
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
              businessInfoArray[13],
              businessInfoArray[14]
            )
          );
        });

        console.log(this.companies);
      });

    this.httpClient
      .get('assets/addresses.csv', { responseType: 'text' })
      .subscribe((data) => {
        let csvToRowArray = data.split('\n');

        let headers = csvToRowArray[0].trim().split(', ');
        console.log(headers);

        csvToRowArray.forEach((row, index) => {
          if (index === 0) {
            return;
          }
          const addressArray = row.trim().split(',');
          this.addresses.push(
            new AddressModel(
              addressArray[0],
              addressArray[1],
              addressArray[2],
              addressArray[3],
              addressArray[4],
              addressArray[5]
            )
          );
        });

        console.log(this.addresses);
      });
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
