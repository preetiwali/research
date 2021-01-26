import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySubmitListAdminComponent } from './study-submit-list-admin.component';

describe('StudySubmitListAdminComponent', () => {
  let component: StudySubmitListAdminComponent;
  let fixture: ComponentFixture<StudySubmitListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySubmitListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySubmitListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
