import { DepositosComponent } from './../components/depositos/depositos.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { LoginComponent } from '../components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import { PanelBeneficiariosComponent } from 'src/components/panel-beneficiarios/panel-beneficiarios.component';
import { PruebaComponent } from 'src/components/prueba/prueba.component';
import { NuevaTransferenciaComponent } from 'src/components/nueva-transferencia/nueva-transferencia.component';

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
},{
  path: 'PanelBeneficiarios',
  component: PanelBeneficiariosComponent,
},{
  path: 'prueba',
  component: PruebaComponent,
},{
  path: 'transferencias',
  component: NuevaTransferenciaComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
