import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAnimatedComponent } from './svg-animated.component';

describe('SvgAnimatedComponent', () => {
  let component: SvgAnimatedComponent;
  let fixture: ComponentFixture<SvgAnimatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgAnimatedComponent]
    });
    fixture = TestBed.createComponent(SvgAnimatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
