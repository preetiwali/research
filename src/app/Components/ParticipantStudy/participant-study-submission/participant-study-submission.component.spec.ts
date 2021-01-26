import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantStudySubmissionComponent } from './participant-study-submission.component';

describe('ParticipantStudySubmissionComponent', () => {
  let component: ParticipantStudySubmissionComponent;
  let fixture: ComponentFixture<ParticipantStudySubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantStudySubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantStudySubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
