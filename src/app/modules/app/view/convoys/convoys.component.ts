import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-convoys',
  templateUrl: './convoys.component.html',
  styleUrls: ['./convoys.component.scss'],
})
export class ConvoysComponent {
  constructor(private api: ApiService) {
    this.get();
  }
  data: any[] = [];
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
    this.api.get('activeConvoys?page=' + page).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.data = [...this.data, ...data.items];
        this.pagination = data.pagination;
      },
      error: (err: any) => {
        this.error = err;
      },
    });
  }
}
