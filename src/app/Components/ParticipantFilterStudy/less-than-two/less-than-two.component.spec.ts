import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessThanTwoComponent } from './less-than-two.component';

describe('LessThanTwoComponent', () => {
  let component: LessThanTwoComponent;
  let fixture: ComponentFixture<LessThanTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessThanTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessThanTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
