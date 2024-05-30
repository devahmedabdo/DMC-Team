import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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
    // {
    //   name: '',
    // },
  ];
  get() {
    this.api.get('product/' + this.id).subscribe({
      next: (data: any) => {
        this.product = data;
      },
    });
  }
  id: any;
  product: any;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.get();
  }
}
