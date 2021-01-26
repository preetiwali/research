import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsentDetailsComponent } from './participantsent-details.component';

describe('ParticipantsentDetailsComponent', () => {
  let component: ParticipantsentDetailsComponent;
  let fixture: ComponentFixture<ParticipantsentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
