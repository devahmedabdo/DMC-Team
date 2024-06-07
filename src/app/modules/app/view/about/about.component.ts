import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  policies: string[] = [
    `نحن فريق عمل تطوعي من طلاب الكليات الطبية بالدلنجات ومؤسسة غير ربحية هدفها نشر الوعي وتنظيم بعض الأنشطة الإجتماعية لمساعدة المحتاجين و توفير الرعاية الصحية لغير القادرين`,
    `مبدأ التعاون بين الفريق وأي جهة من الجهات مرفوض تحت أي مسمي وهدفنا الوحيد هو العمل الخيري وليس لأعضاء الفريق أي مصالح شخصية`,
    `الفريق قائم علي العمل التطوعي فقط ونرفض أن يتم إستخدامنا من قبل أي جهة أو شخص كأداة للدعاية ونرفض أيضا تنظيم أي نشاط تحت رعاية شخص أو جمعية اخري...`,
    ` من يحب المشاركة في العمل الخيري بالتبرع النقدي للفريق او التبرع بالأدوية وما إلي ذلك سيتم النشاط تحت اسم الفريق فقط ونضمن إيصال المساعدة لمستحقيها تحت اسم الفريق فقط`,
    `ليس لنا أي إتجاه سياسي أو ديني ومكونة من شباب "طلاب" الكليات الطبية بالدلنجات كما ذُكِر.`,
    `أي جهة سياسية أو جمعية تذكر اسم الفريق تبعاً لأي نشاط سياسي أو ديني فنحن بريئون منهم وليس لنا أي مصالح خارج نشاط الفريق الخيري التطوعي`,
    `أي نشاط نقوم بيه يكون تحت اسم الفريق فقط وتحت الهدف الوحيد للفريق وهو المشاركة الايجابية في مجتمعنا والمساعدة علي النهوض به في قدر إمكانياتها المحدودة وإن كانت هذة المساعدة ستكون ضئيلة تبعا لهذا الإمكانيات`,
  ];
  members: any[] = [];
  error: any;
  pagination: any = {
    page: 1,
    limit: 3,
    total: 0,
  };
  loading: boolean = false;
  get(page: number = 1) {
    this.loading = true;
    this.error = false;
    this.api.get('members-card?page=' + page).subscribe({
      next: (data: any) => {
        data.items.forEach((ele: any) => {
          ele.committee = ele.committee[0];
        });
        this.loading = false;
        this.members = [...this.members, ...data.items];
        this.pagination = data.pagination;
      },
      error: (err: any) => {
        this.error = err;
      },
    });
  }
  constructor(private api: ApiService) {
    this.get();
  }
}
