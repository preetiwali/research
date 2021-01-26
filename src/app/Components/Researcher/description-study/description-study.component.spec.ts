import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionStudyComponent } from './description-study.component';

describe('DescriptionStudyComponent', () => {
  let component: DescriptionStudyComponent;
  let fixture: ComponentFixture<DescriptionStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
