import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CartService } from 'src/app/core/cart.service';
import { ProductsDataService } from 'src/app/core/products-data.service';
import { Products } from 'src/app/interfaces/products';
import {
  cartSlideLeft,
  cartSlideRight,
  slidUp,
} from 'src/app/shared/animations/toggle-fade';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [cartSlideLeft, cartSlideRight, slidUp],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _productsDataService: ProductsDataService,
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    private _notifierService: NotifierService,
    private _router: Router
  ) {}
  productDetails: Products = {} as Products;
  selectedImage: string = '';
  activeImage: string = '';
  animationState: string = 'start';
  idProduct: string = '';
  offer: number = 0;
  isLoding: boolean = false;

  @ViewChild('allIMages') sliderImages!: ElementRef;

  ngOnInit(): void {
    this._activatedRoute.data.subscribe({
      next: (params: any) => {
        this.productDetails = params.mydetails.data;
        const lastIndex = this.productDetails.images[0];
        this.activeImage = lastIndex;
        this.getDinamicCols();
        this.getOffer(this.productDetails);
      },
    });
  }
  selectImage(image: string): void {
    this.selectedImage = image;
    this.activeImage = image;
  }
  isActive(image: string): boolean {
    return this.selectedImage === image;
  }

  getDinamicCols(): string {
    const cols: number = 12;
    let arrayLength = cols / this.productDetails.images.length;
    if (arrayLength < 3) {
      arrayLength = 3;
    }
    return `col-${arrayLength}`;
  }

  addProduct(id: string): void {
    this.isLoding = true;
    this._cartService.addToCart(id).subscribe({
      next: (respons) => {
        this._cartService.cartNumber.next(respons.numOfCartItems);
        this._notifierService.notify('success', respons.message);
        this.isLoding = false;
      },
      error: (err) => {
        this.isLoding = false;
      },
    });
  }

  toggleAnimationState() {
    this.animationState = this.animationState === 'start' ? 'end' : 'start';
  }

  getOffer(detalsProduct: Products) {
    if (!detalsProduct.priceAfterDiscount) {
      this.offer = Math.trunc(detalsProduct.price * 0.9);
    } else {
      this.offer = detalsProduct.priceAfterDiscount;
    }
  }

  next() {
    this._productsDataService.allProducts().subscribe({
      next: (arr) => {
        let startFromLength = arr.data.findIndex(
          (obj: Products) => obj.id === this.idProduct
        );

        if (startFromLength >= 39) {
          /* minus one to will i incress it with 1 */
          startFromLength = -1;
        }
        console.log(startFromLength);
        /* get the init id when i open details padge */
        let nextId = arr.data[startFromLength + 1].id;

        this._router.navigate(['/details', nextId]);
        /* update idProduct with the prev id */
        this.idProduct = nextId;
      },
    });
  }
  prev() {
    this._productsDataService.allProducts().subscribe({
      next: (arr) => {
        let startFromLength = arr.data.findIndex(
          (obj: Products) => obj.id === this.idProduct
        );
        if (startFromLength <= 0) {
          /* minus one to will i incress it with 1 */
          startFromLength = arr.data.length - 1;
        }
        /* get the init id when i open details padge */
        let nextId = arr.data[startFromLength - 1].id;

        this._router.navigate(['/details', nextId]);
        // /* update idProduct with the prev id */
        this.idProduct = nextId;
      },
    });
  }
}
