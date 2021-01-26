import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStudyReportComponent } from './active-study-report.component';

describe('ActiveStudyReportComponent', () => {
  let component: ActiveStudyReportComponent;
  let fixture: ComponentFixture<ActiveStudyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveStudyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveStudyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
