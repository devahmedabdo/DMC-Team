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
  id: any;
  navigator: any[] = [
    {
      name: 'القوافل',
      rout: '/convoys',
    },
  ];
  convoy: any;
  members: any[] = [];
  pagination: any = {
    page: 1,
    limit: 3,
    total: 0,
  };
  subscriptions: Subscription[] = [];
  error: any;
  maxNumber: number = 0;
  loading: any = {
    convoys: true,
    members: false,
  };
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.get();
  }
  get() {
    this.subscriptions.push(
      this.api.get('convoy/' + this.id).subscribe({
        next: (data: any) => {
          this.loading.convoys = false;
          data.convoy?.numbers.forEach((number: any) => {
            number.collabs = data.convoy?.collaborators.filter((coll: any) => {
              return coll.specialization == number?.specialization._id;
            });
          });
          this.maxNumber = Math.max(
            ...data.convoy.numbers.map((num: any) => +num.total)
          );
          this.convoy = data.convoy;
          this.pagination = data.pagination;
          this.members = data.members;
          console.log(data);
        },
      })
    );
  }
  getMember(page: number = 1) {
    this.loading.members = true;
    this.error = false;
    this.subscriptions.push(
      this.api
        .get('convoy/members-card/' + this.convoy._id + '?page=' + page)
        .subscribe({
          next: (data: any) => {
            this.loading.members = true;
            this.members = [...this.members, ...data.items];
            this.pagination = data.pagination;
          },
          error: (err: any) => {
            this.loading.members = true;
            this.error = err;
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
