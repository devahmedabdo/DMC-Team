import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[textEffect]',
})
export class TitleDirective implements OnInit, OnDestroy, AfterViewInit {
  private intervalId: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.elementRef.nativeElement.getBoundingClientRect().height);
      this.renderer.addClass(this.elementRef.nativeElement, 'opacity-0');
      // this.elementRef.nativeElement.style.height =
      //   this.elementRef.nativeElement.getBoundingClientRect().height + 'px';
    }, 11);
  }
  text: string = '';
  ngOnInit() {
    // Listen to scroll events
    window.addEventListener('scroll', this.checkScrollPosition.bind(this));
    this.checkScrollPosition();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.checkScrollPosition.bind(this));
    clearInterval(this.intervalId);
  }
  started: boolean = false;
  private checkScrollPosition() {
    const element = this.elementRef.nativeElement;
    this.text = element.innerText;
    const rect = element.getBoundingClientRect();
    if (
      rect.top - document.documentElement.clientHeight < -200 &&
      !this.started
    ) {
      this.startWriteEffect(this.text);
    }
  }

  private startWriteEffect(text: string) {
    this.started = true;
    const words = text.split('');
    let index = 0;
    this.intervalId = setInterval(() => {
      if (index < words.length) {
        this.renderer.setProperty(
          this.elementRef.nativeElement,
          'innerText',
          words.slice(0, index + 1).join('')
        );
        if (!index) {
          this.renderer.removeClass(this.elementRef.nativeElement, 'opacity-0');
        }
        index++;
      } else {
        clearInterval(this.intervalId);
      }
    }, 30);
  }
}
