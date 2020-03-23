import { PanelUsuariosComponent } from '../components/panel-usuarios/panel-usuarios.component';
import { PanelTasasComponent } from './../components/panel-tasas/panel-tasas.component';
import { DepositosComponent } from './../components/depositos/depositos.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { LoginComponent } from '../components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import { PanelBeneficiariosComponent } from 'src/components/panel-beneficiarios/panel-beneficiarios.component';
import { PruebaComponent } from 'src/components/prueba/prueba.component';
import { NuevaTransferenciaComponent } from 'src/components/nueva-transferencia/nueva-transferencia.component';
import { NuevoBeneficiarioComponent } from 'src/components/nuevo-beneficiario/nuevo-beneficiario.component';
import { PanelAdministradorComponent } from 'src/components/panel-administrador/panel-administrador.component';
import { NuevoUsuarioComponent } from 'src/components/nuevo-usuario/nuevo-usuario.component';
import { ComprobarComponent } from 'src/components/comprobar/comprobar.component';

const routes: Routes = [
  {
  path: '',
  redirectTo: '/comprobar',
  pathMatch: 'full'
},
{
  path: 'comprobar',
  component: ComprobarComponent
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
},{
  path: 'nuevo-beneficiario',
  component: NuevoBeneficiarioComponent,
},
{
  path: 'panelAdministrador',
  component: PanelAdministradorComponent,
},{
  path: 'panelTasas',
  component: PanelTasasComponent
},{
  path: 'panelAdmUsuarios',
  component: PanelUsuariosComponent
},{
  path: 'addUsuario',
  component: NuevoUsuarioComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
