import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAcceptedRejectedStudyComponent } from './track-accepted-rejected-study.component';

describe('TrackAcceptedRejectedStudyComponent', () => {
  let component: TrackAcceptedRejectedStudyComponent;
  let fixture: ComponentFixture<TrackAcceptedRejectedStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackAcceptedRejectedStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAcceptedRejectedStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
