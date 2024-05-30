import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-btn',
  templateUrl: './pagination-btn.component.html',
  styleUrls: ['./pagination-btn.component.scss'],
})
export class PaginationBtnComponent {
  @Input() pagination: any;
  @Output() pageChange = new EventEmitter<any>();
  @Input() loading!: boolean;
  change() {
    if (this.loading) return;
    this.pageChange.emit(++this.pagination.page);
  }
}
