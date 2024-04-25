import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SettingsUserComponent } from './pages/settings-user/settings-user.component';
import { lodingGuard } from './guards/loding.guard';
import { productResolver } from './guards/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: LayoutblankComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', title: 'home' },
      { path: 'home', component: HomeComponent, title: 'home' },
      { path: 'home/new', component: HomeComponent, title: 'home' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details',
        resolve: { mydetails: productResolver },
      },
      {
        canDeactivate: [lodingGuard],
        path: 'payment/:idcart',
        component: PaymentComponent,
        title: 'Payment',
      },
      {
        path: 'cash-order/:idcart',
        component: CashOrderComponent,
        title: 'Cash Order',
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        title: 'Favorites Item',
      },

      {
        path: 'specificBrand/:id/:brand-name',
        component: SpecificBrandComponent,
        title: 'Specific Brand',
      },
      {
        path: 'specificCategory/:id-category/:name',
        component: SpecificCategoryComponent,
        title: 'Specific Category',
      },
      {
        path: 'allorders',
        component: UserOrdersComponent,
        title: 'All User Orders',
      },
      {
        path: 'specifcOrder/:id',
        component: SpecificOrderComponent,
        title: 'Specifc Order ',
      },
      {
        path: 'settings',
        component: SettingsUserComponent,
        title: 'Settings ',
      },
    ],
  },
  {
    path: '',
    component: LayoutauthComponent,
    children: [
      { path: 'login', component: LoginComponent, title: ' Login ' },
      { path: 'register', component: RegisterComponent, title: ' Register ' },
      {
        path: 'forgetpassword',
        component: ForgetPasswordComponent,
        title: ' Forget Password ',
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [adminGuard],
    title: ' DahBoard  ',
    data: { role: 'admin' },
    loadChildren: () =>
      import('./module/dashboard/dashboard.module').then(
        (mod) => mod.DashboardModule
      ),
  },
  { path: '**', component: NotfoundComponent, title: ' NotFound  ' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
