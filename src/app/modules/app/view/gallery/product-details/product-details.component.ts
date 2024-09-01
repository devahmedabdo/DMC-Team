import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  navigator: any[] = [
    {
      name: 'الجاليري',
      rout: '/gallery',
    },
  ];

  id: any;
  loading: boolean = true;
  product: any;
  more: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private dmc: DmcService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscriptions.push(
      activatedRoute.params.subscribe((param) => {
        this.id = param['id'];
        this.get();
        scrollTo({
          top: 0,
          behavior: 'instant',
        });
      })
    );
  }
  storeProduct(product: any, position: string) {
    this.dmc.storeProduct(product, position, 1);
    this.product[position] = true;
  }
  removeProduct(id: any, position: string) {
    this.dmc.removeProduct(id, position);
    this.product[position] = false;
  }
  get() {
    this.loading = true;
    this.subscriptions.push(
      this.api.get('product/' + this.id).subscribe({
        next: (data: any) => {
          this.product = data.product;
          this.more = data.more;
          this.product.cart = this.dmc.check(
            this.dmc.getItem('cart') || [],
            this.product._id
          );
          this.product.liked = this.dmc.check(
            this.dmc.getItem('liked') || [],
            this.product._id
          );
          setTimeout(() => {
            this.loading = false;
          }, 111);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
