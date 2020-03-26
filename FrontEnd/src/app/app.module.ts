

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { PanelAdministradorComponent } from  '../components/panel-administrador/panel-administrador.component';
import {MatSelectModule} from '@angular/material/select';
import { MatSortModule }  from '@angular/material/sort';

import { ManejoFechasService} from '../../shared/services/manejoFechasService/manejo-fechas.service';
import { TasasService } from './services/tasas/tasas.service';
import { DashboardService } from './services/dasboard/dashboard.service';
import { DepositoService } from './services/deposito/deposito.service';
import { ShowDashboardComponent } from './../components/show-dashboard/show-dashboard.component';
import { ShowRemitenteComponent } from './../components/show-remitente/show-remitente.component';
import { UsuarioService } from '../app/../app/services/usuarioService.service';
import { BeneficiarioService } from './services/beneficiario/beneficiario.service';
import { PanelBeneficiarioServiceService } from '../components/panel-beneficiarios/service/panel-beneficiario-service.service';
import { NuevoBeneficiarioComponent } from '../components/nuevo-beneficiario/nuevo-beneficiario.component';
import { MsjOkDepositComponent } from '../components/nueva-transferencia/msj-ok-deposit/msj-ok-deposit.component';
import { NuevoBeneficiarioService } from '../components/nuevo-beneficiario/service/nuevo-beneficiario.service';
import { SiteFooterComponent } from '../components/site-footer/site-footer.component';
import { DialogoDesconectadoComponent } from '../components/dialogo-desconectado/dialogo-desconectado.component';
import { DepositosComponent } from './../components/depositos/depositos.component';
import { NavigatorComponent } from '../components/navigator/navigator.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { LoginComponent } from '../components/login/login.component';
import { NuevoUsuarioComponent } from '../components/nuevo-usuario/nuevo-usuario.component';

import { FileUploapComponent } from '../../shared/components/file-uploap/file-uploap.component';
import { PanelBeneficiariosComponent } from '../components/panel-beneficiarios/panel-beneficiarios.component';
import { PruebaComponent } from '../components/prueba/prueba.component';
import { NuevaTransferenciaComponent } from '../components/nueva-transferencia/nueva-transferencia.component';
import { BeneficiarioComponent } from '../components/beneficiario/beneficiario.component';
import { PanelTasasComponent } from '../components/panel-tasas/panel-tasas.component'
import { PanelUsuariosComponent } from 'src/components/panel-usuarios/panel-usuarios.component';
import { LoaderComponent } from 'shared/components/loader/loader.component';
import { TablaUsuariosComponent } from 'src/components/tabla-usuarios/tabla-usuarios.component';
import { TablaUsuariosService } from './services/tabla-usuarios/tabla-usuarios.service';
import { DetalleUsuarioComponent } from 'src/components/detalle-usuario/detalle-usuario.component';
import { TablaTasasComponent } from 'src/components/tabla-tasas/tabla-tasas.component';
import { NuevoDashboardComponent } from '../components/nuevo-dashboard/nuevo-dashboard.component';
import { ComprobarComponent } from './../components/comprobar/comprobar.component';
import { ShowDestinatarioComponent } from 'src/components/show-destinatario/show-destinatario.component';
import { ShowMontosComponent } from 'src/components/show-montos/show-montos.component';
@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    NavigatorComponent,
    UsuarioComponent,
    SiteFooterComponent,
    DialogoDesconectadoComponent,
    DepositosComponent,
    PanelBeneficiariosComponent,
    PruebaComponent,
    NuevaTransferenciaComponent,
    BeneficiarioComponent,
    NuevoBeneficiarioComponent,
    FileUploapComponent,
    MsjOkDepositComponent,
    PanelAdministradorComponent,
    PanelTasasComponent,
    PanelUsuariosComponent,
    LoaderComponent,
    TablaUsuariosComponent,
    NuevoUsuarioComponent,
    DetalleUsuarioComponent,
    ComprobarComponent,
    TablaTasasComponent,
    NuevoDashboardComponent,
    ShowDestinatarioComponent,
    ShowRemitenteComponent,
    ShowMontosComponent,
    ShowDashboardComponent
  ],
  imports: [
    //BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    ReactiveFormsModule

  ],
  exports: [

    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers:
   [UsuarioService,
    DepositoService,
    DashboardService,
    BeneficiarioService,
    PanelBeneficiarioServiceService,
    NuevoBeneficiarioService,
    TasasService,
    ManejoFechasService,
    TablaUsuariosService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }


