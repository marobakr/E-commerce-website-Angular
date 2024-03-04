import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { Allorders } from 'src/app/interfaces/allorders';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(private _cartService: CartService) {}
  ngOnInit(): void {}
}
