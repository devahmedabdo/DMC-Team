import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private api: ApiService, private dmc: DmcService) {}
  text: any = '';
  landing: any[] = [{}];
  // ngAfterViewInit(): void {
  //   this.swiper = new Swiper(
  //     this.elementRef.nativeElement.querySelector('.swiper-container'),
  //     {
  //       // Optional Swiper configuration
  //       loop: true, // example option
  //       pagination: {
  //         el: '.swiper-pagination',
  //         clickable: true,
  //       },
  //     }
  //   );
  // }
  numbers: any[] = [
    {
      name: 'قوافل طبية',
      number: 18,
      icon: 'ambulance',
    },
    {
      name: 'مقالات طبية',
      number: 20,
      icon: 'document',
    },
    {
      name: 'حالات رعاية',
      number: 400,
      icon: 'fever',
    },
    {
      name: 'مشاريع رعاية',
      number: 12,
      icon: 'suitcase',
    },
  ];
  donations: any[] = [
    {
      method: 'فودافون كاش',
      project: 'الرعايه',
      value: '01233242332',
    },

    {
      method: 'فودافون كاش',
      project: 'القوافل',
      value: '01546765761',
    },

    {
      method: 'انستاباي',
      project: 'الرعايه',
      value: '01567563434435',
    },

    {
      method: 'فودافون كاش',
      project: 'السونار',
      value: '01231231231',
    },

    {
      method: 'فودافون كاش',
      project: 'السونار',
      value: '01231231231',
    },

    {
      method: 'الرعاية الصحية',
      project: 'الادوات المدرسية',
      value: '01231231231',
    },
  ];
  services: any[] = [
    {
      icon: 'testTubes',
      description:
        'توفير الفحوصات الازمة مجانا لغير المقتدرين بالتعاون مع نخبة من الاطباء في كافة التخصصات الطبية و معامل التحاليل و مراكز الاشعه و العلاج الطبيعي وصرف روشتات مرضي الامراض المزمنه شهريا',
      title: 'الرعاية الصحية',
    },
    {
      icon: 'ambulance',
      description:
        'القيام بقوافل طبية في الاماكن الاكثر احتياجا من قري الدلنجات بالتعاون مع نخبة من اطباء الدلنجات ، حيث يتم صرف العلاج بالمجان من صيدلية الفريق واجراء تحاليل طبية واشعة باسعار مخفضة',
      title: 'القوافل طبية',
    },
    {
      icon: 'peoplesTalk',
      description:
        'المشاركه في تغيير سلوك شباب مجتمعنا عند وجود ظاهرة سيئه منتشره عن طريق انشاء مؤتمرات لايضاح مدي سوء هذا السلوك مع التوجيه الصحيح لتغييره',
      title: 'تحسين االمجتمع',
    },
    {
      icon: 'book',
      description:
        'مساعدة الشباب القادم من فترة الثانويه عن طريق إمداده بالمعلومات اللازمه اللتي تساهم في سهولة إختياره للكليه المنشوده وتمهيدهم للفتره التعليمية المقبله',
      title: 'مساعدة الشباب',
    },
    {
      icon: 'wings',
      description:
        'مشروع قليل منك حياة لهم والذي يستهدف الطبقه الأكثر إحتياجا من المجتمع وإمدادهم بجزء بسيط جدا بجزء من إحتياجاتهم والذي قد يساهم في جعل يومهم أفضل',
      title: 'قليل منك حياة',
    },
  ];
  copy(text: any) {
    this.dmc.message('تم النسخ', 'info', undefined, 'info');
    window.navigator.clipboard.writeText(text);
  }
}
