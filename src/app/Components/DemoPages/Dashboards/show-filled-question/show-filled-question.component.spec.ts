import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFilledQuestionComponent } from './show-filled-question.component';

describe('ShowFilledQuestionComponent', () => {
  let component: ShowFilledQuestionComponent;
  let fixture: ComponentFixture<ShowFilledQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFilledQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFilledQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
