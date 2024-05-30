import { Component, Input, OnInit } from '@angular/core';
import {
  faStar as emptyStar,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowsV,
  faSearch,
  faShoppingBag,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
// import { ProductsService } from 'src/app/services/products.service';
// import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';
import { DmcService } from 'src/app/services/dmc.service';
// import { Product } from 'src/app/interfaces/product';
// import { StorageService } from './../../services/storage.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  cart = faShoppingBag;
  heart = faHeart;
  constructor(
    private dmc: DmcService,
    public router: Router // private storage: StorageService
  ) {}

  @Input() details!: any;
  storeProduct(product: any, position: string, qty?: number) {
    if (qty) product.quantity = qty;
    this.dmc.appendItem(position, product);
    this.dmc.stored[position].next();
    this.details[position] = true;
    this.dmc.message('تم اضافة المنتج', 'info', undefined, 'info');
  }
  removeProduct(id: any, position: string) {
    let products: any[] = this.dmc.getItem(position) || [];
    let productIndex = products.findIndex((ele) => ele._id == id);
    products.splice(productIndex, 1);
    this.dmc.setItem(position, products);
    this.dmc.stored[position].next();
    this.details[position] = false;
    this.dmc.message('تم ازالة المنتج', 'info', undefined, 'delete');
  }

  check(arr: any[] = [], id: any): boolean {
    if (arr.length) {
      let isExist = arr.find((ele) => ele._id == id);
      return Boolean(isExist);
    }
    return false;
  }

  ngOnInit() {
    this.details.cart = this.check(
      this.dmc.getItem('cart') || [],
      this.details._id
    );
    this.details.liked = this.check(
      this.dmc.getItem('liked') || [],
      this.details._id
    );
    // this.product.getProductStatus(this.details);
    // this.setKeys();
  }
}
