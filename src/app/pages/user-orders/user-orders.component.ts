import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { Allorders } from 'src/app/interfaces/allorders';

interface baseinfoUser {
  name: string;
  email: string;
  phone: number;
}

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    private _activatedRoute: ActivatedRoute
  ) {}
  _idCart: string = '';
  userId: any;
  userOrder: Allorders[] = [];
  userImage: string | null = '';
  ngOnInit(): void {
    const userData = this._cartService.decodeUserData();
    this.userId = userData.id;
    this.displayUserOrders();
    if (localStorage.getItem('imageUser') !== null) {
      this.userImage = localStorage.getItem('imageUser');
    }
  }
  displayUserOrders() {
    this._cartService.getUserOrders(this.userId).subscribe({
      next: (response) => {
        this.userOrder = response;
        // console.log(this.userOrder);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  specificOrderUser(id: string) {
    this._cartService.getSpeicifcOrder(id).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
