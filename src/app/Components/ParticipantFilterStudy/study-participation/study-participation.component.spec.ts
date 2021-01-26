import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyParticipationComponent } from './study-participation.component';

describe('StudyParticipationComponent', () => {
  let component: StudyParticipationComponent;
  let fixture: ComponentFixture<StudyParticipationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyParticipationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
