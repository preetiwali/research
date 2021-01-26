import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfUnpublishedStudyComponent } from './list-of-unpublished-study.component';

describe('ListOfUnpublishedStudyComponent', () => {
  let component: ListOfUnpublishedStudyComponent;
  let fixture: ComponentFixture<ListOfUnpublishedStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfUnpublishedStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfUnpublishedStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
