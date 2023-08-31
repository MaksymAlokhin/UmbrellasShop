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
import { ProductEditInfoComponent } from '../product-edit-info/product-edit-info.component';
import { ProductEditTagsComponent } from '../product-edit-tags/product-edit-tags.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductShellDetailComponent,
    ProductShellListComponent,
    ProductShellComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'products',
        component: ProductListComponent,
        canActivate: [authGuard],
      },
      {
        path: 'shell-products',
        component: ProductShellComponent,
        canActivate: [authGuard],
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
        canActivate: [productDetailGuard],
        resolve: { resolvedData: productResolver },
      },
      {
        path: ':id/edit',
        canDeactivate: [productEditGuard],
        resolve: { resolvedData: productResolver },
        component: ProductEditComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          {
            path: 'info',
            component: ProductEditInfoComponent,
          },
          {
            path: 'tags',
            component: ProductEditTagsComponent,
          },
        ],
      },
    ]),
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 500 }),
  ],
})
export class ProductModule {}
