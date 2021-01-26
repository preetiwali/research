import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUserListAdminComponent } from './active-user-list-admin.component';

describe('ActiveUserListAdminComponent', () => {
  let component: ActiveUserListAdminComponent;
  let fixture: ComponentFixture<ActiveUserListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveUserListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUserListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
