import { LodingInterceptor } from './core/interceptors/loding.interceptor';
import { HeadrTokenInterceptor } from './core/interceptors/headr-token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthnavComponent } from './pages/authnav/authnav.component';
import { BlanknavComponent } from './pages/blanknav/blanknav.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutauthComponent } from './layouts/layoutauth/layoutauth.component';
import { LayoutblankComponent } from './layouts/layoutblank/layoutblank.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { notifierDefaultOptions } from './settings/notfications';
import { MainSliderComponent } from './pages/home/components/main-slider/main-slider.component';
import { NotifierModule } from 'angular-notifier';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './pages/details/details.component';
import { BtncartComponent } from './shared/btncart/btncart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EmptycartComponent } from './pages/cart/components/emptycart/emptycart.component';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { SomeProductsComponent } from './pages/home/components/some-products/some-products.component';
import { BrandPipe } from './pipes/brand.pipe';
import { CategoriesPipe } from './pipes/categories.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { StartsPipe } from './pipes/starts.pipe';
import { PricePipe } from './pipes/price.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { SomeCategoriesComponent } from './pages/home/components/some-categories/some-categories.component';
import { SpecificCategoryComponent } from './pages/specific-category/specific-category.component';
import { BaseProductsComponent } from './pages/products/components/base-products/base-products.component';
import { SpecificBrandComponent } from './pages/specific-brand/specific-brand.component';
import { CashOrderComponent } from './pages/cash-order/cash-order.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { SpecificOrderComponent } from './pages/specific-order/specific-order.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SettingsUserComponent } from './pages/settings-user/settings-user.component';
import { SecurityComponent } from './pages/settings-user/components/security/security.component';
import { AccountComponent } from './pages/settings-user/components/account/account.component';
import { AddresseComponent } from './pages/settings-user/components/addresse/addresse.component';
import { UserImagePipe } from './pipes/user-image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AuthnavComponent,
    BlanknavComponent,
    BrandsComponent,
    CartComponent,
    HomeComponent,
    LoginComponent,
    NotfoundComponent,
    RegisterComponent,
    LayoutauthComponent,
    LayoutblankComponent,
    ProductsComponent,
    MainSliderComponent,
    CategoriesComponent,
    DetailsComponent,
    BtncartComponent,
    PaymentComponent,
    ForgetPasswordComponent,
    EmptycartComponent,
    SearchPipe,
    SomeProductsComponent,
    BrandPipe,
    CategoriesPipe,
    SortPipe,
    StartsPipe,
    PricePipe,
    SomeCategoriesComponent,
    SpecificCategoryComponent,
    BaseProductsComponent,
    SpecificBrandComponent,
    CashOrderComponent,
    UserOrdersComponent,
    SpecificOrderComponent,
    WishlistComponent,
    SettingsUserComponent,
    SecurityComponent,
    AccountComponent,
    AddresseComponent,
    UserImagePipe,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    HttpClientModule,
    CarouselModule,
    NgxPaginationModule,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    MatStepperModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatSliderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadrTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LodingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
