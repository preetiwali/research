import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterStudySubmissionComponent } from './after-study-submission.component';

describe('AfterStudySubmissionComponent', () => {
  let component: AfterStudySubmissionComponent;
  let fixture: ComponentFixture<AfterStudySubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterStudySubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterStudySubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
