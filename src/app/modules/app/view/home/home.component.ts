import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  numbers: any[] = [];
  donations: any[] = [];
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
      link: '/convoys',
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
      link: '/projects',
    },
  ];
  maxNumber: number = 0;
  subscriptions: Subscription[] = [];
  constructor(private api: ApiService, private dmc: DmcService) {
    this.get();
  }
  copy(text: any) {
    this.dmc.message('تم النسخ', 'info', undefined, 'info');
    window.navigator.clipboard.writeText(text);
  }
  get() {
    this.subscriptions.push(
      this.api.get('config').subscribe({
        next: (data: any) => {
          this.donations = data.config.donations;
          this.numbers = data.numbers;
          this.maxNumber = Math.max(
            ...data.numbers.map((num: any) => +num.number)
          );
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
