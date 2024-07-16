import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';
import { Allorders } from './../../interfaces/allorders';

@Component({
  selector: 'app-specific-order',
  templateUrl: './specific-order.component.html',
  styleUrls: ['./specific-order.component.css'],
})
export class SpecificOrderComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    private _activatedRoute: ActivatedRoute
  ) {}

  allordersUser: Allorders = {} as Allorders;
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        const ID: any = params.get('id');
        this.displaySpecificOrder(ID);
      },
    });
  }

  displaySpecificOrder(id: string) {
    this._cartService.getSpeicifcOrder(id).subscribe({
      next: (reponse) => {
        this.allordersUser = reponse.data;
      },
    });
  }
}
