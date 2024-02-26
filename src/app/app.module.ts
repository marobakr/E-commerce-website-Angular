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
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- #1 import module
import { HttpClientModule } from '@angular/common/http';
import { notifierDefaultOptions } from './settings/notfications';
import { MainSliderComponent } from './pages/home/components/main-slider/main-slider.component';
import { NotifierModule } from 'angular-notifier';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './pages/details/details.component';
import { BtncartComponent } from './shared/btncart/btncart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AllordersComponent } from './pages/allorders/allorders.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

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
    AllordersComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
