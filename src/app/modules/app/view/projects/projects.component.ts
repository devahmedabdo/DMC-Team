import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnDestroy {
  data: any[] = [];
  error: any;
  pagination: any = {
    page: 1,
    limit: 3,
    total: 0,
  };
  loading: boolean = false;
  subscriptions: Subscription[] = [];
  constructor(private api: ApiService) {
    this.get();
  }
  get(page: number = 1) {
    this.loading = true;
    this.error = false;
    this.subscriptions.push(
      this.api.get('projects?page=' + page).subscribe({
        next: (data: any) => {
          this.loading = false;
          this.data = [...this.data, ...data.items];
          this.pagination = data.pagination;
        },
        error: (err: any) => {
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
