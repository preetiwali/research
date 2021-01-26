import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewStudyComponent } from './edit-new-study.component';

describe('EditNewStudyComponent', () => {
  let component: EditNewStudyComponent;
  let fixture: ComponentFixture<EditNewStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNewStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
