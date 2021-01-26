import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherstudydataComponent } from './researcherstudydata.component';

describe('ResearcherstudydataComponent', () => {
  let component: ResearcherstudydataComponent;
  let fixture: ComponentFixture<ResearcherstudydataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherstudydataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherstudydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
