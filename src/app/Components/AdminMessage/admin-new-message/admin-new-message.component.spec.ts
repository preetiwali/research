import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewMessageComponent } from './admin-new-message.component';

describe('AdminNewMessageComponent', () => {
  let component: AdminNewMessageComponent;
  let fixture: ComponentFixture<AdminNewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
