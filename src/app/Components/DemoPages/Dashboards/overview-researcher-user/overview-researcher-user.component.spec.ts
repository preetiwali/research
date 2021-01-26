import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewResearcherUserComponent } from './overview-researcher-user.component';

describe('OverviewResearcherUserComponent', () => {
  let component: OverviewResearcherUserComponent;
  let fixture: ComponentFixture<OverviewResearcherUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewResearcherUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewResearcherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
