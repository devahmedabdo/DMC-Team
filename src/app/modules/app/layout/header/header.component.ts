import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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
      link: 'aboutus',
    },
  ];
  @Input() activeMenu: boolean = false;
  @Output() activeMenuChange = new EventEmitter<boolean>();
  loading: boolean = false;

  cart: number = 0;
  liked: number = 0;

  constructor(
    private dmc: DmcService,
    private router: Router // private storage: StorageService
  ) {
    dmc.stored.cart.subscribe(() => {
      this.cart = dmc.getItem('cart')?.length || 0;
    });
    dmc.stored.liked.subscribe(() => {
      this.liked = dmc.getItem('liked')?.length || 0;
    });
  }
  ngOnInit(): void {}
  reflectActiveMenu() {
    this.activeMenuChange.emit(!this.activeMenu);
  }
  logout() {
    this.loading = true;
    // this.auth.logout('auth/logout').subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     localStorage.clear();
    //     this.loading = false;
    //     this.router.navigate(['/login']);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     this.loading = false;
    //   },
    // });
  }
}
