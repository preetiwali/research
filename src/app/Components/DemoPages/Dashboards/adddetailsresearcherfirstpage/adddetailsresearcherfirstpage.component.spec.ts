import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddetailsresearcherfirstpageComponent } from './adddetailsresearcherfirstpage.component';

describe('AdddetailsresearcherfirstpageComponent', () => {
  let component: AdddetailsresearcherfirstpageComponent;
  let fixture: ComponentFixture<AdddetailsresearcherfirstpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddetailsresearcherfirstpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddetailsresearcherfirstpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
