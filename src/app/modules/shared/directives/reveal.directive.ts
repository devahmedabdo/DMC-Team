import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[reveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() reveal?: 'b' | 't' | 'r' | 'l';
  @Input() delay: number = 0;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.renderer.addClass(
      this.elementRef.nativeElement,
      this.reveal + 'Reveal'
    );
    window.addEventListener('scroll', this.checkPosition.bind(this));
    setTimeout(() => {
      this.checkPosition();
    }, 300);
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.checkPosition.bind(this));
  }
  checkPosition() {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    if (rect.top - document.documentElement.clientHeight < -100) {
      setTimeout(() => {
        this.renderer.addClass(this.elementRef.nativeElement, 'reveal');
      }, this.delay * 50);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'reveal');
    }
  }
}
