import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  get() {
    this.api.get('convoy/' + this.id).subscribe({
      next: (data: any) => {
        data.convoy?.numbers.forEach((number: any) => {
          number.collabs = data.convoy?.collaborators.filter((coll: any) => {
            return coll.specialization == number?.specialization._id;
          });
        });
        this.convoy = data.convoy;
        this.members = data.members;
        console.log(data);
      },
    });
  }
  id: any;
  navigator: any[] = [
    {
      name: 'القوافل',
      rout: '/convoys',
    },
    // {
    //   name: '',
    // },
  ];
  convoy: any;
  members: any[] = [];
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.get();
  }
  pagination: any = {
    page: 1,
    limit: 3,
    total: 0,
  };
  error: any;
  loading: any = {
    convoy: false,
    members: false,
  };
  getMember(page: number = 1) {
    this.loading.members = true;
    this.error = false;
    this.api.get('activeConvoys?page=' + page).subscribe({
      next: (data: any) => {
        this.loading.members = true;
        this.members = [...this.members, ...data.items];
        this.pagination = data.pagination;
      },
      error: (err: any) => {
        this.loading.members = true;
        this.error = err;
      },
    });
  }
}
