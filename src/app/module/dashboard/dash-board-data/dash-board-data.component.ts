import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardService } from 'src/app/core/dashboard.service';
import { Allorders } from 'src/app/interfaces/allorders';

@Component({
  selector: 'app-dash-board-data',
  templateUrl: './dash-board-data.component.html',
  styleUrls: ['./dash-board-data.component.css'],
})
export class DashBoardDataComponent {
  constructor(
    private _dashboardService: DashboardService,
    private _viewportScroller: ViewportScroller
  ) {}
  inputSearch: string = '';
  allOrders: Allorders[] = [];
  pageSize: number = 10;
  currentPage: number = 0;
  totalItems: number = 0;
  totalPrice: number = 0;
  couterPrice: number = 0;
  couterOrders: number = 0;
  totaOrders: number = 0;
  ngOnInit(): void {
    this.getAllOrders();
    this.counterPrice();
    this.counterProducts();
  }

  //^ shared Main Functions
  getTotalPrice(response: Allorders[]): void {
    response.map((item) => {
      this.couterPrice += item.totalOrderPrice;
    });
  }
  counterPrice() {
    let count = 0;
    setInterval(() => {
      if (this.totalPrice <= this.couterPrice) {
        this.totalPrice += count++;
      } else {
        return;
      }
    }, 10);
  }
  counterProducts() {
    let count = 0;
    setInterval(() => {
      if (this.couterOrders <= this.totaOrders) {
        this.couterOrders += count++;
      } else {
        return;
      }
    }, 10);
  }
  pageChanged(event: any) {
    this._dashboardService.allOrders(event).subscribe({
      next: (response) => {
        this.allOrders = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.results;
        this._viewportScroller.scrollToPosition([0, 0]);
        //* all Users Paginations
      },
    });
  }
  getAllOrders() {
    this._dashboardService.allOrders().subscribe({
      next: (response) => {
        this.totaOrders = response.results;
        this.allOrders = response.data;
        this.getTotalPrice(response.data);
      },
    });
  }
}
