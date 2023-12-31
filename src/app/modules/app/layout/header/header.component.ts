import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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
      name: 'إثراء',
      link: 'questions',
    },
    {
      name: 'الدعم',
      link: 'supprt',
    },
    {
      name: 'نجاح العملاء',
      link: '/clientSuccess',
    },
    // {
    //   name: 'التأهيل',
    //   link: 'qualification',
    // },
    // {
    //   name: 'التذاكر',
    //   link: 'tickets',
    // },
    // {
    //   name: 'التسويق',
    //   link: 'marketing',
    // },
    {
      name: 'المبيعات',
      link: 'sales',
    },
  ];
  @Input() activeMenu!: boolean;
  @Output() activeMenuChange = new EventEmitter<boolean>();
  loading: boolean = false;

  constructor(
    // private auth: AuthService,
    private router: Router // private storage: StorageService
  ) {}
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
