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
  activate() {
    scrollTo({
      top: 0,
      behavior: 'instant',
    });
    this.menu = false;
  }
  loading: boolean = true;
  get() {
    this.api.get('config').subscribe({
      next: (data: any) => {
        this.loading = false;
      },
    });
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private dmc: DmcService
  ) {
    this.get();
  }
}
