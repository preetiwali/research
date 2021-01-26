import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAttemptedStudyComponent } from './track-attempted-study.component';

describe('TrackAttemptedStudyComponent', () => {
  let component: TrackAttemptedStudyComponent;
  let fixture: ComponentFixture<TrackAttemptedStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackAttemptedStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAttemptedStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
