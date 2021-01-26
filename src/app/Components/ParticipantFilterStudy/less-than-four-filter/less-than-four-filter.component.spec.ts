import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessThanFourFilterComponent } from './less-than-four-filter.component';

describe('LessThanFourFilterComponent', () => {
  let component: LessThanFourFilterComponent;
  let fixture: ComponentFixture<LessThanFourFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessThanFourFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessThanFourFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
