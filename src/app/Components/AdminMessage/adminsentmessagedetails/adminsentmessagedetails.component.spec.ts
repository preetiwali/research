import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsentmessagedetailsComponent } from './adminsentmessagedetails.component';

describe('AdminsentmessagedetailsComponent', () => {
  let component: AdminsentmessagedetailsComponent;
  let fixture: ComponentFixture<AdminsentmessagedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsentmessagedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsentmessagedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
