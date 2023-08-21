import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';

import { authGuard } from './user/auth.guard';
import { SelectiveStrategyService } from './selective-strategy.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomerComponent } from './customers/customer-reactive/customer.component';



@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'customer', component: CustomerComponent },
      {
        path: 'products',
        canActivate: [authGuard],
        data: { preload: false },
        loadChildren: () =>
          import('./products/product.module').then(m => m.ProductModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ], { preloadingStrategy: SelectiveStrategyService })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
