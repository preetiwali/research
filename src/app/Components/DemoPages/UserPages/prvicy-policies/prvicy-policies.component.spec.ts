import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrvicyPoliciesComponent } from './prvicy-policies.component';

describe('PrvicyPoliciesComponent', () => {
  let component: PrvicyPoliciesComponent;
  let fixture: ComponentFixture<PrvicyPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrvicyPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrvicyPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
