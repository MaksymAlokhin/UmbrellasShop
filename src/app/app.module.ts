import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { CustomerTemplateComponent } from './customers/customer-template/customer.component';
import { SharedModule } from './shared/shared.module';
import { CustomerComponent } from './customers/customer-reactive/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageModule } from './messages/message.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CustomerTemplateComponent,
    CustomerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductModule,
    SharedModule,
    UserModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 500 }),
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
