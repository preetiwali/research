import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiicpantTotalSubmitComponent } from './partiicpant-total-submit.component';

describe('PartiicpantTotalSubmitComponent', () => {
  let component: PartiicpantTotalSubmitComponent;
  let fixture: ComponentFixture<PartiicpantTotalSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiicpantTotalSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiicpantTotalSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
