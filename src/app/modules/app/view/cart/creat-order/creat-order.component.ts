import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-creat-order',
  templateUrl: './creat-order.component.html',
  styleUrls: ['./creat-order.component.scss'],
})
export class CreatOrderComponent implements OnDestroy {
  products: any[] = [];
  navigator: any[] = [
    {
      name: 'الجاليري',
      rout: '/gallery',
    },
    {
      rout: '/cart',
      name: 'السلة',
    },
  ];
  loading: boolean = false;
  error: string = '';
  totalPrice: number = 0;
  subscriptions: Subscription[] = [];
  constructor(
    private dmc: DmcService,
    private api: ApiService,
    private router: Router
  ) {
    this.products = dmc.getItem('cart') || [];
    if (this.products.length) {
      this.getTotal();
    } else {
      this.router.navigate(['/gallery']);
    }
    this.subscriptions.push(
      this.api.get('config').subscribe({
        next: (data: any) => {
          if (!data.config.acceptOrder) {
            this.router.navigate(['/cart']);
          }
        },
        error: (error: any) => {},
      })
    );
  }
  getTotal() {
    this.totalPrice = this.products.reduce((pre: any, curr: any) => {
      return pre + curr.quantity * curr.price;
    }, 0);
  }
  order(form: NgForm) {
    if (this.loading) return;
    this.error = '';
    this.loading = true;
    let products: any[] = [];
    this.products.forEach((prod: any) => {
      products.push({
        product: prod._id,
        total: prod.quantity,
      });
    });
    form.value.products = products;
    this.subscriptions.push(
      this.api.post('order', form.value).subscribe(
        (data: any) => {
          this.loading = false;
          this.dmc.message('تم انشاء طلبك بنجاح', 'info');
          this.dmc.removeItem('cart');
          this.dmc.stored.cart.next([]);
          this.router.navigate(['/gallery']);
        },
        (error: any) => {
          this.loading = false;
          this.error = error.error.message || error.message;
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
