import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherHelpHeaderComponent } from './researcher-help-header.component';

describe('ResearcherHelpHeaderComponent', () => {
  let component: ResearcherHelpHeaderComponent;
  let fixture: ComponentFixture<ResearcherHelpHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherHelpHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherHelpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
