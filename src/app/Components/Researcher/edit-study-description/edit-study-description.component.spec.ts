import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudyDescriptionComponent } from './edit-study-description.component';

describe('EditStudyDescriptionComponent', () => {
  let component: EditStudyDescriptionComponent;
  let fixture: ComponentFixture<EditStudyDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudyDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudyDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
