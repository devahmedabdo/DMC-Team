import { ElementRef, Renderer2 } from '@angular/core';
import { RevealDirective } from './reveal.directive';

describe('RevealDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = {} as ElementRef<any>; // Mock ElementRef instance
    const rendererMock = {} as Renderer2; // Mock Renderer2 instance
    const directive = new RevealDirective(elementRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
