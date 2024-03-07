import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { Allorders } from 'src/app/interfaces/allorders';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    private _viewportScroller: ViewportScroller
  ) {}
  allOrders: Allorders[] = [];
  pageSize: number = 0;
  currentPage: number = 0;
  totalItems: number = 0;
  totalPrice: number = 0;
  couterPrice: number = 0;
  couterOrders: number = 0;
  totaOrders: number = 0;
  inputSearch: string = '';
  ngOnInit(): void {
    this.getAllOrders();
    this.counterPrice();
    this.counterProducts();
  }
  getAllOrders() {
    this._cartService.allOrders().subscribe({
      next: (response) => {
        this.totaOrders = response.results;
        this.allOrders = response.data;
        this.getTotalPrice(response.data);
      },
    });
  }
  getTotalPrice(response: Allorders[]): void {
    response.map((item) => {
      this.couterPrice += item.totalOrderPrice;
    });
  }
  pageChanged(event: any) {
    this._cartService.allOrders(event).subscribe({
      next: (response) => {
        this.allOrders = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.results;
        this._viewportScroller.scrollToPosition([0, 0]);
      },
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
}
