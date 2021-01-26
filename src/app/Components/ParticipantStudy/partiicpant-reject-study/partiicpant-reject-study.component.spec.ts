import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiicpantRejectStudyComponent } from './partiicpant-reject-study.component';

describe('PartiicpantRejectStudyComponent', () => {
  let component: PartiicpantRejectStudyComponent;
  let fixture: ComponentFixture<PartiicpantRejectStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiicpantRejectStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiicpantRejectStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
