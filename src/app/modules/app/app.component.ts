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
    scrollTo(0, 0);
    this.menu = false;
  }
  get() {
    this.api.get('config/').subscribe({
      next: (data: any) => {
        console.log(data);
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
