import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankStudyComponent } from './blank-study.component';

describe('BlankStudyComponent', () => {
  let component: BlankStudyComponent;
  let fixture: ComponentFixture<BlankStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
