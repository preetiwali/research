import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRejectStudyListComponent } from './accept-reject-study-list.component';

describe('AcceptRejectStudyListComponent', () => {
  let component: AcceptRejectStudyListComponent;
  let fixture: ComponentFixture<AcceptRejectStudyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptRejectStudyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptRejectStudyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
