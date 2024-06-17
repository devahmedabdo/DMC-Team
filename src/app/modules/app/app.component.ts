import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menu: boolean = false;
  loading: boolean = true;
  constructor(private api: ApiService, private dmc: DmcService) {
    this.get();
  }
  get() {
    this.api.get('config').subscribe({
      next: (data: any) => {
        this.loading = false;
      },
      error: (err: any) => {
        this.dmc.message(
          'حدث خطأ اثناء جلب بيانات الموقع في حال استمرار المشكله تواصل معنا',
          'error'
        );
      },
    });
  }
  activate() {
    scrollTo({
      top: 0,
      behavior: 'instant',
    });
    this.menu = false;
  }
}
