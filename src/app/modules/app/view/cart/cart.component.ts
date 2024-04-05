import { DmcService } from 'src/app/services/dmc.service';
import { Component } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

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

  removeProduct(id: any, position: string) {
    let productIndex = this.products.findIndex((ele) => ele._id == id);
    this.products.splice(productIndex, 1);
    this.dmc.setItem(position, this.products);
    this.dmc.stored.cart.next();
  }
}
