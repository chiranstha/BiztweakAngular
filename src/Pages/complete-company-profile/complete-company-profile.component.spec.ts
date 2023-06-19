import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCompanyProfileComponent } from './complete-company-profile.component';

describe('CompleteCompanyProfileComponent', () => {
  let component: CompleteCompanyProfileComponent;
  let fixture: ComponentFixture<CompleteCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteCompanyProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
