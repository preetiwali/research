import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseStudyEditComponent } from './pause-study-edit.component';

describe('PauseStudyEditComponent', () => {
  let component: PauseStudyEditComponent;
  let fixture: ComponentFixture<PauseStudyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseStudyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseStudyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
