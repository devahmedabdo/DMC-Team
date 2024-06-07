import { Component } from '@angular/core';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
})
export class LikedComponent {
  products: any[] = [];
  constructor(private dmc: DmcService) {
    dmc.stored.liked.subscribe(() => {
      this.products = dmc.getItem('liked') || [];
    });
  }
  navigator: any[] = [
    {
      name: 'الجاليري',
      rout: '/gallery',
    },
    {
      name: 'المفضلة',
    },
  ];
}
