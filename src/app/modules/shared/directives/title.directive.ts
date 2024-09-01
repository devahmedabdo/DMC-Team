import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Input,
} from '@angular/core';

@Directive({
  selector: '[textEffect]',
})
export class TitleDirective implements OnInit, OnDestroy, AfterViewInit {
  private intervalId: any;
  started: boolean = false;
  text: string = '';
  @Input() page: string = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    window.addEventListener('scroll', this.checkScrollPosition.bind(this));
    this.checkScrollPosition();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderer.addClass(this.elementRef.nativeElement, 'opacity-0');
    }, 11);
  }
  private checkScrollPosition() {
    const element = this.elementRef.nativeElement;
    this.text = element.innerText;
    const rect = element.getBoundingClientRect();
    if (
      rect.top - document.documentElement.clientHeight < -200 &&
      !this.started
    ) {
      if (!localStorage.getItem(this.page)) {
        this.startWriteEffect(this.text);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, 'opacity-0');
      }
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
        window.removeEventListener(
          'scroll',
          this.checkScrollPosition.bind(this)
        );
      }
    }, 30);
    localStorage.setItem(this.page, 'true');
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.checkScrollPosition.bind(this));
    clearInterval(this.intervalId);
  }
}
