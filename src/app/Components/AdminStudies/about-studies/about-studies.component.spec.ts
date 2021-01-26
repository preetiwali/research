import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutStudiesComponent } from './about-studies.component';

describe('AboutStudiesComponent', () => {
  let component: AboutStudiesComponent;
  let fixture: ComponentFixture<AboutStudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutStudiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
