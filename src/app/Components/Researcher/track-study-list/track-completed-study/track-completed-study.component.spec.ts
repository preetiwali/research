import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCompletedStudyComponent } from './track-completed-study.component';

describe('TrackCompletedStudyComponent', () => {
  let component: TrackCompletedStudyComponent;
  let fixture: ComponentFixture<TrackCompletedStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackCompletedStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCompletedStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
