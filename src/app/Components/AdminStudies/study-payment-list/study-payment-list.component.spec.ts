import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPaymentListComponent } from './study-payment-list.component';

describe('StudyPaymentListComponent', () => {
  let component: StudyPaymentListComponent;
  let fixture: ComponentFixture<StudyPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
