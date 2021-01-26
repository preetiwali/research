import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteParticipantListComponent } from './complete-participant-list.component';

describe('CompleteParticipantListComponent', () => {
  let component: CompleteParticipantListComponent;
  let fixture: ComponentFixture<CompleteParticipantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteParticipantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
