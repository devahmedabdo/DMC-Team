import { Component } from '@angular/core';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menu: boolean = false;
  activate() {
    scrollTo(0, 0);
    this.menu = false;
  }
}
