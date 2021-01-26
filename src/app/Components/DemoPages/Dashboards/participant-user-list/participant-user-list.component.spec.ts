import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantUserListComponent } from './participant-user-list.component';

describe('ParticipantUserListComponent', () => {
  let component: ParticipantUserListComponent;
  let fixture: ComponentFixture<ParticipantUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
