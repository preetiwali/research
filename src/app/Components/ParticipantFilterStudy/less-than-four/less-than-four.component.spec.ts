import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessThanFourComponent } from './less-than-four.component';

describe('LessThanFourComponent', () => {
  let component: LessThanFourComponent;
  let fixture: ComponentFixture<LessThanFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessThanFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessThanFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
