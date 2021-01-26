import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAudienceComponent } from './study-audience.component';

describe('StudyAudienceComponent', () => {
  let component: StudyAudienceComponent;
  let fixture: ComponentFixture<StudyAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyAudienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
