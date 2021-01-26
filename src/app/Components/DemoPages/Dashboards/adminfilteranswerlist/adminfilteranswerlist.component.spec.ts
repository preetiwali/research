import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfilteranswerlistComponent } from './adminfilteranswerlist.component';

describe('AdminfilteranswerlistComponent', () => {
  let component: AdminfilteranswerlistComponent;
  let fixture: ComponentFixture<AdminfilteranswerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminfilteranswerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminfilteranswerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
