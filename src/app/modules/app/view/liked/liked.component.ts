import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
})
export class LikedComponent implements OnDestroy {
  products: any[] = [];
  subscriptions: Subscription[] = [];
  navigator: any[] = [
    {
      name: 'الجاليري',
      rout: '/gallery',
    },
    {
      name: 'المفضلة',
    },
  ];
  constructor(private dmc: DmcService) {
    this.subscriptions.push(
      dmc.stored.liked.subscribe(() => {
        this.products = dmc.getItem('liked') || [];
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
