import { DmcService } from 'src/app/services/dmc.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnDestroy {
  products: any[] = [];
  navigator: any[] = [
    {
      name: 'الجاليري',
      rout: '/gallery',
    },
    {
      name: 'السلة',
    },
  ];
  subscriptions: Subscription[] = [];
  acceptOrder: boolean = false;
  constructor(private dmc: DmcService, private api: ApiService) {
    this.products = dmc.getItem('cart') || [];
    this.subscriptions.push(
      this.api.get('config').subscribe({
        next: (data: any) => {
          this.acceptOrder = data.config.acceptOrder;
        },
        error: (error: any) => {},
      })
    );
  }

  removeProduct(index: any) {
    this.products.splice(+index, 1);
    this.dmc.setItem('cart', this.products);
    this.dmc.stored.cart.next();
  }
  updateProduct(product: any) {
    product.quantity = +product.quantity || 1;
    let cart: any[] = this.dmc.getItem('cart') || [];
    let productIndex = cart.findIndex((ele) => ele._id == product._id);
    cart[productIndex] = product;
    this.dmc.setItem('cart', cart);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
