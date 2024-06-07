import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  navigator: any[] = [
    {
      name: 'الجاليري',
      rout: '/gallery',
    },
  ];
  get() {
    this.api.get('product/' + this.id).subscribe({
      next: (data: any) => {
        this.product = data;
        this.product.cart = this.dmc.check(
          this.dmc.getItem('cart') || [],
          this.product._id
        );
        this.product.liked = this.dmc.check(
          this.dmc.getItem('liked') || [],
          this.product._id
        );
        console.log(this.product);
      },
    });
  }
  id: any;
  product: any;
  storeProduct(product: any, position: string) {
    this.dmc.storeProduct(product, position, 1);
    this.product[position] = true;
  }
  removeProduct(id: any, position: string) {
    this.dmc.removeProduct(id, position);
    this.product[position] = false;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private dmc: DmcService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.get();
  }
}
