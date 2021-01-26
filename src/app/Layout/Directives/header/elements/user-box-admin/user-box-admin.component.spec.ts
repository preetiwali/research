import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBoxAdminComponent } from './user-box-admin.component';

describe('UserBoxAdminComponent', () => {
  let component: UserBoxAdminComponent;
  let fixture: ComponentFixture<UserBoxAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBoxAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBoxAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
