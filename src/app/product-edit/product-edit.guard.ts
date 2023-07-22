import { CanDeactivateFn } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';

export const productEditGuard: CanDeactivateFn<ProductEditComponent> = (component, currentRoute, currentState, nextState) => {
  if (component.productForm.dirty) {
    const productName = component.productForm.get('productName')!.value || 'New Product';
    return confirm(`Navigate away and lose all changes to ${productName}?`);
  }
  return true;
};
