import { Component, Input } from '@angular/core';
import { Allorders } from 'src/app/interfaces/allorders';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
})
export class AllOrdersComponent {
  constructor() {}
  @Input() allOrders: Allorders[] = [];
  @Input() inputSearch: string = '';
  @Input() pageSize: number = 0;
  @Input() currentPage: number = 0;
  @Input() totalItems: number = 0;
  @Input() idPagination: string = '';
}
