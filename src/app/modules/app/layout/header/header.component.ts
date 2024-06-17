import { HttpHeaders } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  @Input() activeMenu: boolean = false;
  @Output() activeMenuChange = new EventEmitter<boolean>();
  nav: any[] = [
    {
      name: 'الرئيسة',
      link: '',
    },
    {
      name: 'الجاليري',
      link: 'gallery',
    },
    {
      name: 'القوافل',
      link: 'convoys',
    },
    {
      name: 'المشاريع',
      link: 'projects',
    },
    {
      name: 'من نحن',
      link: 'about',
    },
  ];
  headerOptions: any = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.dmc.getItem('auth')?.token,
      Accept: 'application/json',
    }),
  };
  loading: boolean = false;
  cart: number = 0;
  liked: number = 0;
  user: any;
  subscriptions: Subscription[] = [];

  constructor(
    private api: ApiService,
    private dmc: DmcService,
    private router: Router
  ) {
    dmc.stored.cart.subscribe(() => {
      this.cart = dmc.getItem('cart')?.length || 0;
    });
    dmc.stored.liked.subscribe(() => {
      this.liked = dmc.getItem('liked')?.length || 0;
    });
    this.user = dmc.getItem('auth')?.member;
  }
  reflectActiveMenu() {
    this.activeMenuChange.emit(!this.activeMenu);
  }
  logout() {
    this.loading = true;
    this.subscriptions.push(
      this.api.delete('member/logout', this.headerOptions).subscribe({
        next: (data) => {
          localStorage.clear();
          this.loading = false;
          this.router.navigate(['/login']);
          if (this.dmc.data['member']) this.dmc.data['member'].next(null);
          this.dmc.message('تم تسجيل الخروج', 'info');
        },
        error: (error) => {
          this.dmc.message('حدث خطأ', 'error');
          this.loading = false;
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
