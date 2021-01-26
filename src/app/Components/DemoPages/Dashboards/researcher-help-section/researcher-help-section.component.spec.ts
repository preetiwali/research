import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherHelpSectionComponent } from './researcher-help-section.component';

describe('ResearcherHelpSectionComponent', () => {
  let component: ResearcherHelpSectionComponent;
  let fixture: ComponentFixture<ResearcherHelpSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherHelpSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherHelpSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
