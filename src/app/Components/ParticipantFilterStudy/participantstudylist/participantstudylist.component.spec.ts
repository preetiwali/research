import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantstudylistComponent } from './participantstudylist.component';

describe('ParticipantstudylistComponent', () => {
  let component: ParticipantstudylistComponent;
  let fixture: ComponentFixture<ParticipantstudylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantstudylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantstudylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
