import { NgModule } from '@angular/core';
import { MyFilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    /* declare it once, here */
    MyFilterPipe
  ],
  exports: [
    /* then export it */
    MyFilterPipe
  ]
})
export class SharedModule { }