import { DmcService } from 'src/app/services/dmc.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products: any[] = [];
  constructor(private dmc: DmcService) {
    this.products = dmc.getItem('cart');
  }
  navigator: any[] = [
    {
      name: 'الجاليري',
      rout: '/gallery',
    },
    {
      name: 'السلة',
    },
  ];
  removeProduct(index: any) {
    this.products.splice(+index, 1);
    this.dmc.setItem('cart', this.products);
    this.dmc.stored.cart.next();
  }
  updateProduct(product: any) {
    console.log('changed');
    product.quantity = +product.quantity || 1;
    let cart: any[] = this.dmc.getItem('cart') || [];
    let productIndex = cart.findIndex((ele) => ele._id == product._id);
    cart[productIndex] = product;
    this.dmc.setItem('cart', cart);
  }
}
