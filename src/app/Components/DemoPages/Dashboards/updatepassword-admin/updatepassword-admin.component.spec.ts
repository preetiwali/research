import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepasswordADminComponent } from './updatepassword-admin.component';

describe('UpdatepasswordADminComponent', () => {
  let component: UpdatepasswordADminComponent;
  let fixture: ComponentFixture<UpdatepasswordADminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepasswordADminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepasswordADminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
