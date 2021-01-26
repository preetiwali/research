import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassowrdUserComponent } from './change-passowrd-user.component';

describe('ChangePassowrdUserComponent', () => {
  let component: ChangePassowrdUserComponent;
  let fixture: ComponentFixture<ChangePassowrdUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePassowrdUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassowrdUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
