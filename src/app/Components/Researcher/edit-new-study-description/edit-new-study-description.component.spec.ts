import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewStudyDEscriptionComponent } from './edit-new-study-description.component';

describe('EditNewStudyDEscriptionComponent', () => {
  let component: EditNewStudyDEscriptionComponent;
  let fixture: ComponentFixture<EditNewStudyDEscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNewStudyDEscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewStudyDEscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
