import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiicpantTotalAttepmtComponent } from './partiicpant-total-attepmt.component';

describe('PartiicpantTotalAttepmtComponent', () => {
  let component: PartiicpantTotalAttepmtComponent;
  let fixture: ComponentFixture<PartiicpantTotalAttepmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiicpantTotalAttepmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiicpantTotalAttepmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
