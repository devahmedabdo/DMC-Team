import { Component } from '@angular/core';
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year: number = new Date().getFullYear();
  constructor() { }
  links: any[] = [
    {
      icon: faFacebook,
      link: '',
      color: '#0078bd',
    },
    {
      icon: faXTwitter,
      link: '',
      color: '#92d1ff',
    },
    {
      icon: faInstagram,
      link: '',
      color: '#ff6dae',
    },
  ];
}
