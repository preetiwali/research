import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDetailsComponent } from './study-details.component';

describe('StudyDetailsComponent', () => {
  let component: StudyDetailsComponent;
  let fixture: ComponentFixture<StudyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
