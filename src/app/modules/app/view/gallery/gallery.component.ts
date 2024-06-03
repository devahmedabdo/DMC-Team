import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  navigator: any[] = [
    // {
    //   name: 'الجاليري',
    //   rout: '/gallery',
    // },
  ];
  products: any[] = [];
  error: any;
  pagination: any = {
    page: 1,
    limit: 3,
    total: 0,
  };
  loading: boolean = false;
  constructor(private api: ApiService) {
    this.get();
  }
  get(page: number = 1) {
    this.loading = true;
    this.error = false;
    this.api.get('products?page=' + page).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.products = [...this.products, ...data.items];
        this.pagination = data.pagination;
      },
      error: (err: any) => {
        this.error = err;
      },
    });
  }
}