import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantarchiveComponent } from './participantarchive.component';

describe('ParticipantarchiveComponent', () => {
  let component: ParticipantarchiveComponent;
  let fixture: ComponentFixture<ParticipantarchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantarchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantarchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
