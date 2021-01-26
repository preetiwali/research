import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStudyListDetailsComponent } from './track-study-list-details.component';

describe('TrackStudyListDetailsComponent', () => {
  let component: TrackStudyListDetailsComponent;
  let fixture: ComponentFixture<TrackStudyListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackStudyListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackStudyListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
