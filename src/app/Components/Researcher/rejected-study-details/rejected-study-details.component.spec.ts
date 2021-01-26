import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStudyDetailsComponent } from './rejected-study-details.component';

describe('RejectedStudyDetailsComponent', () => {
  let component: RejectedStudyDetailsComponent;
  let fixture: ComponentFixture<RejectedStudyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedStudyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedStudyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
