import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyStudyComponent } from './copy-study.component';

describe('CopyStudyComponent', () => {
  let component: CopyStudyComponent;
  let fixture: ComponentFixture<CopyStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
