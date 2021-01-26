import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreThanFourComponent } from './more-than-four.component';

describe('MoreThanFourComponent', () => {
  let component: MoreThanFourComponent;
  let fixture: ComponentFixture<MoreThanFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreThanFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreThanFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
