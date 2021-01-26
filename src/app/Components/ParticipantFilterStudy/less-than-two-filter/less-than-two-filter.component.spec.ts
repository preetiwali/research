import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessThanTwoFilterComponent } from './less-than-two-filter.component';

describe('LessThanTwoFilterComponent', () => {
  let component: LessThanTwoFilterComponent;
  let fixture: ComponentFixture<LessThanTwoFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessThanTwoFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessThanTwoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
