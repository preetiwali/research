import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStudyComponent } from './active-study.component';

describe('ActiveStudyComponent', () => {
  let component: ActiveStudyComponent;
  let fixture: ComponentFixture<ActiveStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
