import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBoxParticipantComponent } from './user-box-participant.component';

describe('UserBoxParticipantComponent', () => {
  let component: UserBoxParticipantComponent;
  let fixture: ComponentFixture<UserBoxParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBoxParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBoxParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
