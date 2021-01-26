import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfStudiesComponent } from './number-of-studies.component';

describe('NumberOfStudiesComponent', () => {
  let component: NumberOfStudiesComponent;
  let fixture: ComponentFixture<NumberOfStudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfStudiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
