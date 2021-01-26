import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotCompletionCodeComponent } from './forgot-completion-code.component';

describe('ForgotCompletionCodeComponent', () => {
  let component: ForgotCompletionCodeComponent;
  let fixture: ComponentFixture<ForgotCompletionCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotCompletionCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotCompletionCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
