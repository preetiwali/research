import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStudyComponent } from './rejected-study.component';

describe('RejectedStudyComponent', () => {
  let component: RejectedStudyComponent;
  let fixture: ComponentFixture<RejectedStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
