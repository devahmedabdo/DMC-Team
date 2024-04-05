import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private api: ApiService) {
    this.get();
  }
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
  products: any[] = [];

  get() {
    this.api.get('products').subscribe({
      next: (data: any) => {
        this.products = data.items;
      },
    });
  }
}
