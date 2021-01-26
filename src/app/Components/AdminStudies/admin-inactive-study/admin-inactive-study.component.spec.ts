import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInactiveStudyComponent } from './admin-inactive-study.component';

describe('AdminInactiveStudyComponent', () => {
  let component: AdminInactiveStudyComponent;
  let fixture: ComponentFixture<AdminInactiveStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInactiveStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInactiveStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
