import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRatingListComponent } from './participant-rating-list.component';

describe('ParticipantRatingListComponent', () => {
  let component: ParticipantRatingListComponent;
  let fixture: ComponentFixture<ParticipantRatingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantRatingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
