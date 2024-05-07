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
  constructor(private api: ApiService) {
    this.get();
  }
  get() {
    this.api.get('products').subscribe({
      next: (data: any) => {
        this.products = data.items;
      },
    });
  }
}
