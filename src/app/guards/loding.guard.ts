import { CanDeactivateFn } from '@angular/router';
import { ProductsComponent } from '../pages/products/products.component';
import { PaymentComponent } from '../pages/payment/payment.component';

export const lodingGuard: CanDeactivateFn<PaymentComponent> = (
  PaymentComponent
) => {
  if (
    window.confirm('all your data will be lose ') &&
    PaymentComponent.canDeActivate
  ) {
    return true;
  } else {
    return false;
  }
};
