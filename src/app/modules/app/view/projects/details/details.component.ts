import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnDestroy {
  maxNumber: number = 0;
  loading: boolean = true;
  id: any;
  navigator: any[] = [
    {
      name: 'المشاريع',
      rout: '/projects',
    },
  ];
  more: any[] = [];
  subscriptions: Subscription[] = [];
  project: any;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscriptions.push(
      activatedRoute.params.subscribe((param) => {
        this.id = param['id'];
        this.get();
        scrollTo({
          top: 0,
          behavior: 'instant',
        });
      })
    );
  }
  get() {
    this.loading = true;
    this.subscriptions.push(
      this.api.get('project/' + this.id).subscribe({
        next: (data: any) => {
          this.loading = false;
          this.project = data.project;
          this.more = data.more;
          this.maxNumber = Math.max(
            ...data.project.numbers.map((num: any) => +num.count)
          );
          console.log(this.maxNumber);
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
