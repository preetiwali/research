import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherSideComponent } from './researcher-side.component';

describe('ResearcherSideComponent', () => {
  let component: ResearcherSideComponent;
  let fixture: ComponentFixture<ResearcherSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
