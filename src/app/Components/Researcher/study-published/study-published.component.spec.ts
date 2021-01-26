import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPublishedComponent } from './study-published.component';

describe('StudyPublishedComponent', () => {
  let component: StudyPublishedComponent;
  let fixture: ComponentFixture<StudyPublishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyPublishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
