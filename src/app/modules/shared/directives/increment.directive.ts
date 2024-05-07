import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIncrement]',
})
export class IncrementDirective {
  private intervalId: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  @Input() appIncrement: any = 0;
  @Input() max: any = 0;
  @Input() speed: number = 50;
  ngOnInit() {
    window.addEventListener('scroll', this.checkScrollPosition.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.checkScrollPosition.bind(this));
    clearInterval(this.intervalId);
  }
  started: boolean = false;
  private checkScrollPosition() {
    const element = this.elementRef.nativeElement;
    const isInView =
      element.getBoundingClientRect().top -
        document.documentElement.clientHeight <
      -200;

    if (isInView && !this.started) {
      this.started = true;
      let index = 1;
      this.intervalId = setInterval(() => {
        if (index < this.appIncrement) {
          this.setNumber(index);
          index++;
        } else {
          clearInterval(this.intervalId);
        }
      }, this.speed * (this.max / this.appIncrement));
    }
  }

  setNumber(number: number) {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerText',
      number
    );
  }
}
