import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeAnswersListComponent } from './range-answers-list.component';

describe('RangeAnswersListComponent', () => {
  let component: RangeAnswersListComponent;
  let fixture: ComponentFixture<RangeAnswersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeAnswersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeAnswersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
