import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantInboxComponent } from './participant-inbox.component';

describe('ParticipantInboxComponent', () => {
  let component: ParticipantInboxComponent;
  let fixture: ComponentFixture<ParticipantInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
