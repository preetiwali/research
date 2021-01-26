import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpmessageComponent } from './helpmessage.component';

describe('HelpmessageComponent', () => {
  let component: HelpmessageComponent;
  let fixture: ComponentFixture<HelpmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
