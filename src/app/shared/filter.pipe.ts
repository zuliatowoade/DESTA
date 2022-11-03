import { Pipe, PipeTransform } from '@angular/core';
import { BusinessInfo } from './business-info-model';

@Pipe({
  name: 'myfilter',
  pure: false,
})
export class MyFilterPipe implements PipeTransform {
  transform(items: BusinessInfo[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(
      (item) => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  }
}
