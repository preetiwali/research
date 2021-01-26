import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletParticipantComponent } from './wallet-participant.component';

describe('WalletParticipantComponent', () => {
  let component: WalletParticipantComponent;
  let fixture: ComponentFixture<WalletParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
