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
        this.convoy = data;
      },
    });
  }
  id: any;
  convoy: any;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.get();
  }
}
