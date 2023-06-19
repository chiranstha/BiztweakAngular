import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHealthReportComponent } from './business-health-report.component';

describe('BusinessHealthReportComponent', () => {
  let component: BusinessHealthReportComponent;
  let fixture: ComponentFixture<BusinessHealthReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessHealthReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessHealthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
