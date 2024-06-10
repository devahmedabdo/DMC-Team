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
    this.loading = true;
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
    });
  }
  maxNumber: number = 0;
  loading: boolean = true;
  id: any;
  project: any;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
    this.id = this.activatedRoute.snapshot.params['id'];
    activatedRoute.params.subscribe((param) => {
      this.id = param['id'];
      this.get();
      scrollTo({
        top: 0,
        behavior: 'instant',
      });
    });
  }
  navigator: any[] = [
    {
      name: 'المشاريع',
      rout: '/projects',
    },
    // {
    //   name: '',
    // },
  ];
  more: any[] = [];
}
