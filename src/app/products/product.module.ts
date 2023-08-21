import { NgModule } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { productDetailGuard } from '../product-detail/product-detail.guard';
import { productEditGuard } from '../product-edit/product-edit.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';
import { ProductShellDetailComponent } from '../product-shell-detail/product-shell-detail.component';
import { ProductShellListComponent } from '../product-shell-list/product-shell-list.component';
import { ProductShellComponent } from '../product-shell/product-shell.component';
import { authGuard } from '../user/auth.guard';
import { productResolver } from './product.resolver';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductShellDetailComponent,
    ProductShellListComponent,
    ProductShellComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductListComponent },
      {
        path: 'shell-products',
        component: ProductShellComponent,
        canActivate: [authGuard],
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
        canActivate: [productDetailGuard],
        resolve: { resolvedData: productResolver }
      },
      {
        path: ':id/edit',
        canDeactivate: [productEditGuard],
        component: ProductEditComponent,
        resolve: { resolvedData: productResolver }
      },
    ]),
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 500 }),
  ],
})
export class ProductModule {}
