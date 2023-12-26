import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor() {}
  landing: any[] = [{}];
  // ngAfterViewInit(): void {
  //   this.swiper = new Swiper(
  //     this.elementRef.nativeElement.querySelector('.swiper-container'),
  //     {
  //       // Optional Swiper configuration
  //       loop: true, // example option
  //       pagination: {
  //         el: '.swiper-pagination',
  //         clickable: true,
  //       },
  //     }
  //   );
  // }
}
