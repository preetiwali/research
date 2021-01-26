import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantInboxDetailsComponent } from './participant-inbox-details.component';

describe('ParticipantInboxDetailsComponent', () => {
  let component: ParticipantInboxDetailsComponent;
  let fixture: ComponentFixture<ParticipantInboxDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantInboxDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantInboxDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
