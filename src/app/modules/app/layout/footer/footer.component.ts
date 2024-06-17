import { Component, OnDestroy } from '@angular/core';
import { IconName } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnDestroy {
  year: number = new Date().getFullYear();
  links: any[] = [];
  subscriptions: Subscription[] = [];
  constructor(private api: ApiService, private dmc: DmcService) {
    this.get();
  }
  resolveIconName(key: any): IconName {
    return key as IconName;
  }
  get() {
    this.subscriptions.push(
      this.api.get('config').subscribe({
        next: (data: any) => {
          this.links = data.config.links;
        },
        error: (error: any) => {},
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
