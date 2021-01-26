import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibleCndidatesListComponent } from './eligible-cndidates-list.component';

describe('EligibleCndidatesListComponent', () => {
  let component: EligibleCndidatesListComponent;
  let fixture: ComponentFixture<EligibleCndidatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibleCndidatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibleCndidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
