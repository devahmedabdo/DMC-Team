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
  // cart = faShoppingBag;
  heart = faHeart;
  constructor(
    private dmc: DmcService,
    public router: Router // private storage: StorageService
  ) {}

  @Input() details!: any;
  storeProduct(product: any, position: string) {
    this.dmc.storeProduct(product, position, 1);
    this.details[position] = true;
  }
  removeProduct(id: any, position: string) {
    this.dmc.removeProduct(id, position);
    this.details[position] = false;
  }

  ngOnInit() {
    this.details.cart = this.dmc.check(
      this.dmc.getItem('cart') || [],
      this.details._id
    );
    this.details.liked = this.dmc.check(
      this.dmc.getItem('liked') || [],
      this.details._id
    );
    // this.product.getProductStatus(this.details);
    // this.setKeys();
  }
}
