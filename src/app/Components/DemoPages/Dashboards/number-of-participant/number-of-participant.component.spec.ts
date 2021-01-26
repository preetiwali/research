import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfParticipantComponent } from './number-of-participant.component';

describe('NumberOfParticipantComponent', () => {
  let component: NumberOfParticipantComponent;
  let fixture: ComponentFixture<NumberOfParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
