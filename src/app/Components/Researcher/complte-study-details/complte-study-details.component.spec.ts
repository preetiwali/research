import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplteStudyDetailsComponent } from './complte-study-details.component';

describe('ComplteStudyDetailsComponent', () => {
  let component: ComplteStudyDetailsComponent;
  let fixture: ComponentFixture<ComplteStudyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplteStudyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplteStudyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
