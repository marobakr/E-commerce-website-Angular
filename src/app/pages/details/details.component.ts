import { NotifierService } from 'angular-notifier';
import {
  AfterContentInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class DetailsComponent implements AfterContentInit {
  constructor(
    private _productsDataService: ProductsDataService,
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    private _notifierService: NotifierService
  ) {}
  selectedImage: string = '';
  activeImage: string = '';
  isLoding: boolean = false;
  productDetails: Products = {} as Products;
  animationState: string = 'start';

  @ViewChild('allIMages') sliderImages!: ElementRef;

  ngAfterContentInit(): void {
    this.getIdPrameter();
  }

  getIdPrameter(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (respons: any) => {
        this.displayDetails(respons.params.id);
      },
    });
  }
  displayDetails(id: string): void {
    this._productsDataService.getDetails(id).subscribe({
      next: (respons) => {
        this.productDetails = respons.data;
        const lastIndex = this.productDetails.images[0];
        this.activeImage = lastIndex;
        this.getDinamicCols();
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
        console.log(err);
      },
    });
  }

  toggleAnimationState() {
    this.animationState = this.animationState === 'start' ? 'end' : 'start';
  }
}
