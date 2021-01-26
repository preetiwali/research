import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherFirstLoginComponent } from './researcher-first-login.component';

describe('ResearcherFirstLoginComponent', () => {
  let component: ResearcherFirstLoginComponent;
  let fixture: ComponentFixture<ResearcherFirstLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherFirstLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherFirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
