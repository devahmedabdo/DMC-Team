import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToTopComponent } from './to-top.component';

describe('ToTopComponent', () => {
  let component: ToTopComponent;
  let fixture: ComponentFixture<ToTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToTopComponent]
    });
    fixture = TestBed.createComponent(ToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
