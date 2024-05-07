import { IncrementDirective } from './increment.directive';
import { ElementRef, Renderer2 } from '@angular/core'; // Import ElementRef and Renderer2

describe('IncrementDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = {} as ElementRef<any>; // Mock ElementRef instance
    const rendererMock = {} as Renderer2; // Mock Renderer2 instance
    const directive = new IncrementDirective(elementRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
