import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActiveStudyComponent } from './admin-active-study.component';

describe('AdminActiveStudyComponent', () => {
  let component: AdminActiveStudyComponent;
  let fixture: ComponentFixture<AdminActiveStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActiveStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActiveStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
