import { DepositosComponent } from './../components/depositos/depositos.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { LoginComponent } from '../components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';

const routes: Routes = [
  {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'panel-usuario',
  component: UsuarioComponent,
},{
  path: 'MisTransacciones',
  component: DepositosComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
