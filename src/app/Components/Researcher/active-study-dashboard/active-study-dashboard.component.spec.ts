import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStudyDashboardComponent } from './active-study-dashboard.component';

describe('ActiveStudyDashboardComponent', () => {
  let component: ActiveStudyDashboardComponent;
  let fixture: ComponentFixture<ActiveStudyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveStudyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveStudyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
