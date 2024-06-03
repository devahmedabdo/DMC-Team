import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatOrderComponent } from './creat-order.component';

describe('CreatOrderComponent', () => {
  let component: CreatOrderComponent;
  let fixture: ComponentFixture<CreatOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatOrderComponent]
    });
    fixture = TestBed.createComponent(CreatOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
