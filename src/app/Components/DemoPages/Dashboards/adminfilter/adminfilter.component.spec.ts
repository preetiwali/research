import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfilterComponent } from './adminfilter.component';

describe('AdminfilterComponent', () => {
  let component: AdminfilterComponent;
  let fixture: ComponentFixture<AdminfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
