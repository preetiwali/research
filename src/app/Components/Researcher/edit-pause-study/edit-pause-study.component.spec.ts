import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPauseStudyComponent } from './edit-pause-study.component';

describe('EditPauseStudyComponent', () => {
  let component: EditPauseStudyComponent;
  let fixture: ComponentFixture<EditPauseStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPauseStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPauseStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
