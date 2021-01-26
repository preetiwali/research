import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantNewMessageComponent } from './participant-new-message.component';

describe('ParticipantNewMessageComponent', () => {
  let component: ParticipantNewMessageComponent;
  let fixture: ComponentFixture<ParticipantNewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantNewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantNewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
