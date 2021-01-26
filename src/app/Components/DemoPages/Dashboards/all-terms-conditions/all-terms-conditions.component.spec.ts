import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTermsConditionsComponent } from './all-terms-conditions.component';

describe('AllTermsConditionsComponent', () => {
  let component: AllTermsConditionsComponent;
  let fixture: ComponentFixture<AllTermsConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTermsConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
