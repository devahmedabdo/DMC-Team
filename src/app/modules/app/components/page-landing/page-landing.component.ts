import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-landing',
  templateUrl: './page-landing.component.html',
  styleUrls: ['./page-landing.component.scss'],
})
export class PageLandingComponent {
  @Input() page!: string;
  pages: any = {
    convoys: {
      name: 'Convoys'.split(''),
      dis: 'القوافل الطبية',
      img: 'convoys',
    },
    gallery: {
      name: 'Gallery'.split(''),
      dis: 'منتجات الفريق',
      img: 'gallery',
    },
    projects: {
      name: 'Projects'.split(''),
      img: 'projects',
      dis: 'مشاريع الفريق',
    },
    home: {
      name: 'DMC'.split(''),
      img: 'landing',
    },
    about: {
      name: 'About Us'.split(''),
      img: 'abouus',
      dis: 'عن الفريق',
    },
    ramadan: {
      name: 'Ramadan'.split(''),
      img: 'ramadan',
      dis: 'شنط رمضان',
    },
    kesaa: {
      name: 'Kesaa'.split(''),
      img: 'kesaa',
      dis: 'حملة كساء',
    },
    eadAdha: {
      name: 'Ead Adha'.split(''),
      img: 'eadAdha',
      dis: 'لحمة العيد',
    },
    school: {
      name: 'School'.split(''),
      img: 'school',
      dis: 'الادوات المدرسية',
    },
  };
}
