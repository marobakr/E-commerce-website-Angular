import { CartService } from 'src/app/core/cart.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BtncartComponent } from 'src/app/shared/btncart/btncart.component';
import { NotifierService } from 'angular-notifier';
import { toggleFade } from 'src/app/shared/animations/toggle-fade';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [toggleFade],
})
export class CartComponent implements AfterViewInit {
  constructor(
    private _cartService: CartService,
    private _notifierService: NotifierService
  ) {}
  cartProduct: any;
  isLoding: boolean = false;
  ngAfterViewInit(): void {
    this.displayCartUser();
  }

  displayCartUser(): void {
    this._cartService.getCartUser().subscribe({
      next: (respons) => {
        this.cartProduct = respons;
        this._cartService.cartNumber.next(this.cartProduct.numOfCartItems);
      },
      error: (erorr) => {
        console.log(erorr);
      },
    });
  }

  removeCartItem(id: string, Btn: BtncartComponent) {
    Btn.isLoding = true;
    this._cartService.removeCartItem(id).subscribe({
      next: (respons) => {
        Btn.isLoding = false;
        this.cartProduct = respons;
        this._cartService.cartNumber.next(respons.numOfCartItems);
        this._notifierService.notify('error', 'Item removed from the cart');
      },
      error: (erorr) => {
        console.log(erorr);

        Btn.isLoding = false;
      },
    });
  }
  updateCountItem(id: string, countItem: number, status: string, msg: string) {
    if (countItem > 0) {
      this._cartService.updateCartQuantity(id, countItem).subscribe({
        next: (respons) => {
          this.cartProduct = respons;
          this._cartService.cartNumber.next(respons.numOfCartItems);
          this._notifierService.notify(`${status}`, `${msg}`);
        },
        error: (erorr) => {
          console.log(erorr);
        },
      });
    }
  }
  removeAllItem() {
    this._cartService.clearCart().subscribe({
      next: (respons) => {
        if (respons.message === 'success') {
          this.cartProduct = null;
          this._cartService.cartNumber.next(0);
        }
      },
      error: (erorr) => {
        console.log(erorr);
      },
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.cartProduct.data.products,
      event.previousIndex,
      event.currentIndex
    );
  }
}
