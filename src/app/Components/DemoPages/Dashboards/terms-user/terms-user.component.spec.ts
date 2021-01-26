import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsUserComponent } from './terms-user.component';

describe('TermsUserComponent', () => {
  let component: TermsUserComponent;
  let fixture: ComponentFixture<TermsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
