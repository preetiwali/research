import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceQuestionListComponent } from './audience-question-list.component';

describe('AudienceQuestionListComponent', () => {
  let component: AudienceQuestionListComponent;
  let fixture: ComponentFixture<AudienceQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudienceQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienceQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
