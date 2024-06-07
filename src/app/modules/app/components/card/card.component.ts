import { Component, Input } from '@angular/core';
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faTwitter,
  IconName,
} from '@fortawesome/free-brands-svg-icons';
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
    date: new Date(
      'Mon Jan 01 2018 02:00:00 GMT+0200 (Eastern European Standard Time)'
    ),
    convoys_count: 4,
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
  constructor() {}

  year_count: any;
  year_diffrent: any;
  convoys_diffrent: any;
  calc(user_date: any) {
    let user_join = new Date(user_date);
    this.year_count =
      (new Date().getTime() - user_join.getTime()) / 1000 / 60 / 60 / 24 / 365;
    this.year_diffrent =
      ((new Date().getTime() - user_join.getTime()) * 185) /
      this.team.date.getTime();
    this.convoys_diffrent =
      ((this.team.convoys_count - this.user.convoys.length) * 185) /
      this.team.convoys_count;
  }

  ngOnInit(): void {
    this.calc(this.user?.joinDate);
  }
}
