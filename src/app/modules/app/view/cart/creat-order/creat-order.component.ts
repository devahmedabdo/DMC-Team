import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faWhatsapp,
  faTwitter,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEye,
  faEyeSlash,
  faContactCard,
} from '@fortawesome/free-regular-svg-icons';
import {
  faMailBulk,
  faLocationDot,
  faCity,
  faStreetView,
  faHome,
  faMale,
  faFemale,
  faUserTie,
  faBuildingUser,
  faCamera,
  faExchange,
} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-creat-order',
  templateUrl: './creat-order.component.html',
  styleUrls: ['./creat-order.component.scss'],
})
export class CreatOrderComponent {
  products: any[] = [];
  ////////////////////////
  emailIcon = faMailBulk;
  contactIcon = faContactCard;
  whatsappIcon = faWhatsapp;

  cityIcon = faCity;
  streetIcon = faHome;
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
  ////////////////////////
  constructor(private dmc: DmcService, private api: ApiService) {
    this.products = dmc.getItem('cart');
    this.getTotal();
  }
  getTotal() {
    this.totalPrice = this.products.reduce((pre: any, curr: any) => {
      return pre + curr.quantity * curr.price;
    }, 0);
  }
  loading: boolean = false;
  error: string = '';
  totalPrice: number = 0;
  order(data: any) {
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
    data.products = products;
    console.log(data);
    this.api.post('order', data).subscribe(
      (data: any) => {
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        this.error = error.error.message || error.message;
      }
    );
  }
}
