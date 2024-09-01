import { Component, Input, OnDestroy } from '@angular/core';
import { IconName } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnDestroy {
  @Input() user: any;

  subscriptions: Subscription[] = [];
  color_1: any = '#164e63';
  color_2: any = '#009fc1';
  team: any = {
    date: new Date('2018-08-15T00:00:00.000Z'),
    convoys_count: 18,
  };
  year_count: any;
  year_diffrent: any;
  convoys_diffrent: any;

  constructor(private api: ApiService, private dmc: DmcService) {}
  ngOnInit(): void {
    this.getConf();
    if (this.user.socialAccounts.whatsapp)
      this.user.socialAccounts.whatsapp =
        'https://wa.me/+2' + this.user.socialAccounts.whatsapp;
  }
  resolveIconName(key: any): IconName {
    return key as IconName;
  }
  calc() {
    let dateAsMember =
      new Date().getTime() - new Date(this.user.joinDate).getTime();
    let teamDuration =
      new Date().getTime() - new Date(this.team.date).getTime();

    this.year_diffrent = ((teamDuration - dateAsMember) / teamDuration) * 185;
    this.convoys_diffrent =
      ((+this.team.convoys_count - (+this.user?.convoys?.length || 0)) /
        this.team.convoys_count) *
      185;
  }
  getConf() {
    this.subscriptions.push(
      this.api.get('config').subscribe({
        next: (data: any) => {
          this.team.convoys_count = data.numbers[0].number;
          this.calc();
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
