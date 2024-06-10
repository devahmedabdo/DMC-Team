import { Component, Input } from '@angular/core';
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faTwitter,
  IconName,
} from '@fortawesome/free-brands-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() user: any;
  color_1: any = '#164e63';
  color_2: any = '#009fc1';
  team: any = {
    date: new Date('2018-08-15T00:00:00.000Z'),
    convoys_count: 18,
  };
  icons: any = {
    'facebook-f': faFacebookF,
    instagram: faInstagram,
    whatsapp: faWhatsapp,
    twitter: faTwitter,
  };
  // facebook = faFacebookF;
  // instagram = faInstagram;
  // whatsapp = faWhatsapp;
  // twitter = faTwitter;
  public resolveIconName(key: any): IconName {
    return key as IconName;
  }
  constructor(private api: ApiService, private dmc: DmcService) {
    this.get();
  }

  get() {
    this.api.get('config').subscribe({
      next: (data: any) => {
        // this.donations = data.config.donations;
        // this.numbers = data.numbers;
      },
      error: (error: any) => {},
    });
  }
  year_count: any;
  year_diffrent: any;
  convoys_diffrent: any;
  calc(user_date: any) {
    let dateAsMember =
      new Date().getTime() - new Date(this.user.joinDate).getTime();
    let teamDuration =
      new Date().getTime() - new Date(this.team.date).getTime();

    // console.log((teamDuration - dateAsMember) / teamDuration);

    // let user_join = new Date(user_date); // ex: 2018
    // let currentDate = new Date();
    // let teamDate = new Date(this.team.date);

    // Calculate the number of years the user has been a member

    // this.year_count =
    //   (currentDate.getTime() - user_join.getTime()) /
    //   (1000 * 60 * 60 * 24 * 365);

    // console.log('year_count:', this.year_count);

    // Ensure this.team.date is a Date object
    // let per =
    //   (currentDate.getTime() - user_join.getTime()) /
    //     (currentDate.getTime() - teamDate.getTime()) -
    //   1;

    // console.log(per * 100);
    // Calculate the year difference
    this.year_diffrent = ((teamDuration - dateAsMember) / teamDuration) * 185;

    this.convoys_diffrent =
      ((+this.team.convoys_count - (+this.user?.convoys?.length || 0)) /
        this.team.convoys_count) *
      185;
  }
  getConf() {
    this.api.get('config').subscribe({
      next: (data: any) => {
        this.team.convoys_count = data;
      },
    });
  }
  ngOnInit(): void {
    this.calc(this.user?.joinDate);
    this.api.get('config');
  }
}
