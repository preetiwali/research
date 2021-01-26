import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStudyDetailsComponent } from './track-study-details.component';

describe('TrackStudyDetailsComponent', () => {
  let component: TrackStudyDetailsComponent;
  let fixture: ComponentFixture<TrackStudyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackStudyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackStudyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
