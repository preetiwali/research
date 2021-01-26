import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreThanFourFilterComponent } from './more-than-four-filter.component';

describe('MoreThanFourFilterComponent', () => {
  let component: MoreThanFourFilterComponent;
  let fixture: ComponentFixture<MoreThanFourFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreThanFourFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreThanFourFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
