import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackActiveStudyComponent } from './track-active-study.component';

describe('TrackActiveStudyComponent', () => {
  let component: TrackActiveStudyComponent;
  let fixture: ComponentFixture<TrackActiveStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackActiveStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackActiveStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
