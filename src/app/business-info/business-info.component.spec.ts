import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInfoComponent } from './business-info.component';

describe('BusinessInfoComponent', () => {
  let component: BusinessInfoComponent;
  let fixture: ComponentFixture<BusinessInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
