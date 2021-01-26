import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsParticipantsComponent } from './accounts-participants.component';

describe('AccountsParticipantsComponent', () => {
  let component: AccountsParticipantsComponent;
  let fixture: ComponentFixture<AccountsParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
