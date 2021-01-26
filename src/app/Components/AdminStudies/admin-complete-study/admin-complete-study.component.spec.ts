import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompleteStudyComponent } from './admin-complete-study.component';

describe('AdminCompleteStudyComponent', () => {
  let component: AdminCompleteStudyComponent;
  let fixture: ComponentFixture<AdminCompleteStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompleteStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompleteStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
