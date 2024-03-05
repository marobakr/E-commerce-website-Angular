import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductsComponent } from './pages/products/products.component';
import { LayoutblankComponent } from './layouts/layoutblank/layoutblank.component';
import { LayoutauthComponent } from './layouts/layoutauth/layoutauth.component';
import { authGuard } from './guards/auth.guard';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DetailsComponent } from './pages/details/details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { SpecificCategoryComponent } from './pages/specific-category/specific-category.component';
import { SpecificBrandComponent } from './pages/specific-brand/specific-brand.component';
import { CashOrderComponent } from './pages/cash-order/cash-order.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { SpecificOrderComponent } from './pages/specific-order/specific-order.component';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutblankComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'payment/:idcart', component: PaymentComponent },
      { path: 'cash-order/:idcart', component: CashOrderComponent },
      {
        path: 'specificBrand/:id/:brand-name',
        component: SpecificBrandComponent,
      },
      {
        path: 'specificCategory/:id-category/:name',
        component: SpecificCategoryComponent,
      },
      { path: 'allorders', component: UserOrdersComponent },
      { path: 'specifcOrder/:id', component: SpecificOrderComponent },
    ],
  },
  {
    path: '',
    component: LayoutauthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgetpassword', component: ForgetPasswordComponent },
    ],
  },

  {
    path: 'dashboard',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./module/dashboard/dashboard.module').then(
        (mod) => mod.DashboardModule
      ),
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
