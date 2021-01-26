import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActiveStudyDetailsComponent } from './admin-active-study-details.component';

describe('AdminActiveStudyDetailsComponent', () => {
  let component: AdminActiveStudyDetailsComponent;
  let fixture: ComponentFixture<AdminActiveStudyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActiveStudyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActiveStudyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
