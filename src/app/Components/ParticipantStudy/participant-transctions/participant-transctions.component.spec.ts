import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantTransctionsComponent } from './participant-transctions.component';

describe('ParticipantTransctionsComponent', () => {
  let component: ParticipantTransctionsComponent;
  let fixture: ComponentFixture<ParticipantTransctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantTransctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantTransctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
