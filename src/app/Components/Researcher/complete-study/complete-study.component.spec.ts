import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteStudyComponent } from './complete-study.component';

describe('CompleteStudyComponent', () => {
  let component: CompleteStudyComponent;
  let fixture: ComponentFixture<CompleteStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
