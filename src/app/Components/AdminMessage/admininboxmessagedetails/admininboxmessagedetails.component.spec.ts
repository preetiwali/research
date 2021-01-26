import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmininboxmessagedetailsComponent } from './admininboxmessagedetails.component';

describe('AdmininboxmessagedetailsComponent', () => {
  let component: AdmininboxmessagedetailsComponent;
  let fixture: ComponentFixture<AdmininboxmessagedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmininboxmessagedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmininboxmessagedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
