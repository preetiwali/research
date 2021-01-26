import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfilteruserdetailsComponent } from './adminfilteruserdetails.component';

describe('AdminfilteruserdetailsComponent', () => {
  let component: AdminfilteruserdetailsComponent;
  let fixture: ComponentFixture<AdminfilteruserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminfilteruserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminfilteruserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
