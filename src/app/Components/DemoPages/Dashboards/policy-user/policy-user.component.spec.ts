import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyUserComponent } from './policy-user.component';

describe('PolicyUserComponent', () => {
  let component: PolicyUserComponent;
  let fixture: ComponentFixture<PolicyUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
