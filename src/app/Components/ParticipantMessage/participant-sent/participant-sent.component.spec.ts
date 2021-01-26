import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantSEntComponent } from './participant-sent.component';

describe('ParticipantSEntComponent', () => {
  let component: ParticipantSEntComponent;
  let fixture: ComponentFixture<ParticipantSEntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantSEntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantSEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
