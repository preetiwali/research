import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteStudyDetailsAdminComponent } from './complete-study-details-admin.component';

describe('CompleteStudyDetailsAdminComponent', () => {
  let component: CompleteStudyDetailsAdminComponent;
  let fixture: ComponentFixture<CompleteStudyDetailsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteStudyDetailsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteStudyDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
