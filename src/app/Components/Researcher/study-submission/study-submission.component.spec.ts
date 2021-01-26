import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySubmissionComponent } from './study-submission.component';

describe('StudySubmissionComponent', () => {
  let component: StudySubmissionComponent;
  let fixture: ComponentFixture<StudySubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
