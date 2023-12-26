import { Component } from '@angular/core';
import { faArrowUp, faUpLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-to-top',
  templateUrl: './to-top.component.html',
  styleUrls: ['./to-top.component.scss']
})
export class ToTopComponent {
  constructor() { }
  top = faArrowUp;
  documentHieght: number = 0;
  scrollHeight: number = 0;
  divisionConst: number = 0;
  dashOffset: number = 310;
  screenHieght: number = 0;
  toTop() {
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
    // console.log('im in');
    this.screenHieght = window.innerHeight;
    window.onscroll = () => {
      this.documentHieght = document.documentElement.scrollHeight;
      this.divisionConst = this.documentHieght / 310;
      this.scrollHeight = document.documentElement.scrollTop;
      let position =
        this.documentHieght - this.screenHieght - this.scrollHeight;
      this.dashOffset = position / this.divisionConst;
    };
  }
}
