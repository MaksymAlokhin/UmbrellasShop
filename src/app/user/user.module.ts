import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ])
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
