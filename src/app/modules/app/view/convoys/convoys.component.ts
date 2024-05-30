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
  get(page: number = 1) {
    let data = {
      items: [
        {
          _id: '6584122709ad33b92f89b987',
          description: {
            address: 'قمحة',
            order: 2,
            date: '2023-12-12T22:00:00.000Z',
            postLink: '1',
          },
          numbers: [
            {
              specialization: {
                _id: '6583f224cf0238ade749f20e',
                name: 'كلى',
                icon: 'kidney.svg',
                __v: 0,
              },
              total: 23,
            },
          ],
          numbersData: [
            {
              _id: '6583f224cf0238ade749f20e',
              name: 'كلى',
              icon: 'kidney.svg',
              __v: 0,
            },
          ],
        },
        {
          _id: '65a7e97e3d77895551510a33',
          description: {
            address: 'awd',
            order: 2,
            date: '2024-01-03T22:00:00.000Z',
            postLink: '2',
          },
          numbers: [
            {
              specialization: {
                _id: '6583f224cf0238ade749f20e',
                name: 'كلى',
                icon: 'kidney.svg',
                __v: 0,
              },
              total: 23,
            },
            {
              specialization: {
                _id: '65841dc5d8ebbd0204c0a0c9',
                name: 'awdawd',
                icon: 'bacteria.svg',
                __v: 0,
              },
              total: 23,
            },
          ],
          numbersData: [
            {
              _id: '6583f224cf0238ade749f20e',
              name: 'كلى',
              icon: 'kidney.svg',
              __v: 0,
            },
            {
              _id: '65841dc5d8ebbd0204c0a0c9',
              name: 'awdawd',
              icon: 'bacteria.svg',
              __v: 0,
            },
          ],
        },
        {
          _id: '65abc9f8a6a7df0145048a61',
          description: {
            address: 'شصي',
            order: 2,
            date: '2024-01-06T22:00:00.000Z',
            postLink: '2',
          },
          numbers: [],
          numbersData: [],
        },
      ],
      pagination: {
        page: 1,
        limit: 4,
        total: 3,
      },
    };
    this.data = data.items;
    // return;
    this.api.get('activeConvoys?page=' + page).subscribe((data: any) => {
      console.log(data);
      this.data = data.items;
    });
  }
}
