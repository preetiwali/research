import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiicpantAcceptRejectComponent } from './partiicpant-accept-reject.component';

describe('PartiicpantAcceptRejectComponent', () => {
  let component: PartiicpantAcceptRejectComponent;
  let fixture: ComponentFixture<PartiicpantAcceptRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiicpantAcceptRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiicpantAcceptRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
