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
  products: any = [
    {
      name: 'Aerodynamic Wooden Hatt',
      price: 90,
      disscount: 10,
      stock: 30,
      image1: 'assets/product/product-1 (1).jpg',
      image2: 'assets/product/product-1 (2).jpg',
      image3: 'assets/product/product-1 (3).jpg',
      image4: 'assets/product/product-1 (4).jpg',
      sellerCount: 44,
      seller: 'jewlarry home',
      tags: ['ring', 'earning', 'necklaces'],
    },
    {
      name: 'Durable Marble Bench',
      price: 126.0,
      disscount: 30,
      stock: 30,
      image1: 'assets/product/10.1.jpg',
      image2: 'assets/product/12.1.jpg',
      image3: 'assets/product/product-1 (3).jpg',
      image4: 'assets/product/product-1 (4).jpg',
      sellerCount: 44,
      seller: 'jewlarry home',
      tags: ['ring', 'diamond', 'necklaces'],
    },
    {
      name: 'Heavy Duty Steel Wallet',
      price: 340,
      disscount: 20,
      stock: 30,
      image1: 'assets/product/7.1.jpg',
      image2: 'assets/product/8.1.jpg',
      image3: 'assets/product/7.1.jpg',
      image4: 'assets/product/8.1.jpg',
      sellerCount: 44,
      seller: 'jewlarry home',
      tags: ['ring', 'diamond', 'earning'],
    },
    {
      name: 'Small Linen Lamp',
      price: 487.0,
      disscount: 20,
      stock: 30,
      image1: 'assets/product/4.1.jpg',
      image2: 'assets/product/5.1.jpg',
      image3: 'assets/product/4.1.jpg',
      image4: 'assets/product/5.1.jpg',
      sellerCount: 44,
      seller: 'jewlarry home',
      tags: ['ring', 'diamond', 'earning'],
    },
    {
      name: 'Elara Diamond Ring',
      price: 100,
      disscount: 10,
      stock: 30,
      image1: 'assets/product/9.1.jpg',
      image2: 'assets/product/6.1.jpg',
      image3: 'assets/product/9.1.jpg',
      image4: 'assets/product/6.1.jpg',
      review: 2,
      sellerCount: 44,
      seller: 'jewlarry home',
      tags: ['ring', 'diamond', 'NECKLACES & PENDANTS'],
    },
  ];
}
