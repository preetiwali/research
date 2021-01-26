import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InActiveStudyAdminComponent } from './in-active-study-admin.component';

describe('InActiveStudyAdminComponent', () => {
  let component: InActiveStudyAdminComponent;
  let fixture: ComponentFixture<InActiveStudyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InActiveStudyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InActiveStudyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
