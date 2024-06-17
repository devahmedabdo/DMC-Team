import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DmcService } from 'src/app/services/dmc.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() details!: any;
  constructor(private dmc: DmcService, public router: Router) {}
  ngOnInit() {
    this.details.cart = this.dmc.check(
      this.dmc.getItem('cart') || [],
      this.details._id
    );
    this.details.liked = this.dmc.check(
      this.dmc.getItem('liked') || [],
      this.details._id
    );
  }
  storeProduct(product: any, position: string) {
    this.dmc.storeProduct(product, position, 1);
    this.details[position] = true;
  }
  removeProduct(id: any, position: string) {
    this.dmc.removeProduct(id, position);
    this.details[position] = false;
  }
}
