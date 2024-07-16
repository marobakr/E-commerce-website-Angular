import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { Allorders } from 'src/app/interfaces/allorders';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  constructor(private _cartService: CartService) {}
  _idCart: string = '';
  userId: any;
  userOrder: Allorders[] = [];
  userImage: string | null = '';
  ngOnInit(): void {
    const userData = this._cartService.decodeUserData();
    this.userId = userData.id;
    this.displayUserOrders();
  }
  displayUserOrders() {
    this._cartService.getUserOrders(this.userId).subscribe({
      next: (response) => {
        this.userOrder = response;
        this._cartService.orderNumber.next(response.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
