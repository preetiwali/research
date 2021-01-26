import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityNameComponent } from './university-name.component';

describe('UniversityNameComponent', () => {
  let component: UniversityNameComponent;
  let fixture: ComponentFixture<UniversityNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
