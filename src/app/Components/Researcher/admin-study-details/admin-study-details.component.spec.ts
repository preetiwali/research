import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudyDetailsComponent } from './admin-study-details.component';

describe('AdminStudyDetailsComponent', () => {
  let component: AdminStudyDetailsComponent;
  let fixture: ComponentFixture<AdminStudyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
