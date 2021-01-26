import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCandidateInfoListComponent } from './active-candidate-info-list.component';

describe('ActiveCandidateInfoListComponent', () => {
  let component: ActiveCandidateInfoListComponent;
  let fixture: ComponentFixture<ActiveCandidateInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveCandidateInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCandidateInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
