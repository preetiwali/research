import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewParticipantUserComponent } from './overview-participant-user.component';

describe('OverviewParticipantUserComponent', () => {
  let component: OverviewParticipantUserComponent;
  let fixture: ComponentFixture<OverviewParticipantUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewParticipantUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewParticipantUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
