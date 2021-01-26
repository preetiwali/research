import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotcompletioncodeComponent } from './forgotcompletioncode.component';

describe('ForgotcompletioncodeComponent', () => {
  let component: ForgotcompletioncodeComponent;
  let fixture: ComponentFixture<ForgotcompletioncodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotcompletioncodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotcompletioncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
