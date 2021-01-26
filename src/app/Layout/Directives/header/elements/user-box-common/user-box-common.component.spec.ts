import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBoxCommonComponent } from './user-box-common.component';

describe('UserBoxCommonComponent', () => {
  let component: UserBoxCommonComponent;
  let fixture: ComponentFixture<UserBoxCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBoxCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBoxCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
