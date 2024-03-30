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
// import { Product } from 'src/app/interfaces/product';
// import { StorageService } from './../../services/storage.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  // clickEventSubscribtion: Subscription;
  emptyStar = emptyStar;
  star = faStar;
  quickView = faSearch;
  cart = faShoppingBag;
  copmare = faArrowsV;
  heart = faHeart;
  constructor(
    // private product: ProductsService,
    // private cartService: CartService,
    public router: Router // private storage: StorageService
  ) {
    // this.clickEventSubscribtion = this.cartService.getItems().subscribe(() => {
    //   this.product.getProductStatus(this.details);
    //   // this.setKeys();
    // });
  }

  @Input() details!: any;
  storeProduct(index: any, position: string) {
    // this.product.storeProduct(index, position);
    // this.cartService.setItems();
  }
  storeSinglProduct(details: any) {
    // this.storage.storageItem('singlProduct', JSON.stringify(details));
    // window.localStorage.setItem('singlProduct', await );
    this.router.navigateByUrl('product');
  }
  // setKeys() {
  //   let liked = this.storage.getStoredItem('favourite') || [];
  //   let compare = this.storage.getStoredItem('compare') || [];
  //   let cart = this.storage.getStoredItem('cart') || [];
  //   let setKey = (arr: any[], key: string) => {
  //     if (arr.length == 0) {
  //       this.details[key] = false;
  //     }
  //     arr.forEach(async () => {
  //       let strArr = await JSON.stringify(arr);
  //       let strProd = await JSON.stringify(this.details.name);
  //       if (strArr.includes(strProd)) {
  //         this.details[key] = true;
  //       } else {
  //         this.details[key] = false;
  //       }
  //     });
  //   };
  //   [liked, compare, cart].forEach(async (e) => {
  //     if (e == liked) {
  //       setKey(e, 'favourite');
  //     } else if (e == compare) {
  //       setKey(e, 'compare');
  //     } else if (e == cart) {
  //       setKey(e, 'cart');
  //     }
  //   });
  // }
  // async setKeys() {
  //   let liked = await this.product.getStoreProduct('favourite');
  //   let compare = await this.product.getStoreProduct('compare');
  //   let cart = await this.product.getStoreProduct('cart');
  //   let setKey = (arr: any[], key: string) => {
  //     if (arr.length == 0) {
  //       this.details[key] = false;
  //     }
  //     arr.forEach(async () => {
  //       let strArr = await JSON.stringify(arr);
  //       let strProd = await JSON.stringify(this.details.name);
  //       if (strArr.includes(strProd)) {
  //         this.details[key] = true;
  //       } else {
  //         this.details[key] = false;
  //       }
  //     });
  //   };
  //   [liked, compare, cart].forEach(async (e) => {
  //     if (e == liked) {
  //       setKey(e, 'favourite');
  //     } else if (e == compare) {
  //       setKey(e, 'compare');
  //     } else if (e == cart) {
  //       setKey(e, 'cart');
  //     }
  //   });
  // }
  async ngOnInit() {
    // this.product.getProductStatus(this.details);
    // this.setKeys();
  }
}
