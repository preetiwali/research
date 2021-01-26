import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherHelpContentComponent } from './researcher-help-content.component';

describe('ResearcherHelpContentComponent', () => {
  let component: ResearcherHelpContentComponent;
  let fixture: ComponentFixture<ResearcherHelpContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherHelpContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherHelpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
