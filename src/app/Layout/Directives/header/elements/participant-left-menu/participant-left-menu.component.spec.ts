import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantLeftMenuComponent } from './participant-left-menu.component';

describe('ParticipantLeftMenuComponent', () => {
  let component: ParticipantLeftMenuComponent;
  let fixture: ComponentFixture<ParticipantLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
