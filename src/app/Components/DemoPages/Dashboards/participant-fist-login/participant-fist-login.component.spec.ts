import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantFistLoginComponent } from './participant-fist-login.component';

describe('ParticipantFistLoginComponent', () => {
  let component: ParticipantFistLoginComponent;
  let fixture: ComponentFixture<ParticipantFistLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantFistLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantFistLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
