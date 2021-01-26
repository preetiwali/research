import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStudyDetailsComponent } from './active-study-details.component';

describe('ActiveStudyDetailsComponent', () => {
  let component: ActiveStudyDetailsComponent;
  let fixture: ComponentFixture<ActiveStudyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveStudyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveStudyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
