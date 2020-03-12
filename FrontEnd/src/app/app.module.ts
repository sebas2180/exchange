import { TasasService } from './services/tasas/tasas.service';
import { DashboardService } from './services/dasboard/dashboard.service';
import { BrowserModule } from '@angular/platform-browser';
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
import {MatSelectModule} from '@angular/material/select';
import { MatSortModule }  from '@angular/material/sort';

import { DepositoService } from './services/deposito/deposito.service';
import { UsuarioService } from '../app/../app/services/usuarioService.service';
import { BeneficiarioService } from './services/beneficiario/beneficiario.service';
import { PanelBeneficiarioServiceService } from '../components/panel-beneficiarios/service/panel-beneficiario-service.service';
import { NuevoBeneficiarioComponent } from '../components/nuevo-beneficiario/nuevo-beneficiario.component';

import { NuevoBeneficiarioService } from '../components/nuevo-beneficiario/service/nuevo-beneficiario.service';
import { SiteFooterComponent } from '../components/site-footer/site-footer.component';
import { DialogoDesconectadoComponent } from '../components/dialogo-desconectado/dialogo-desconectado.component';
import { DepositosComponent } from './../components/depositos/depositos.component';
import { NavigatorComponent } from '../components/navigator/navigator.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { LoginComponent } from '../components/login/login.component';
import { PanelBeneficiariosComponent } from '../components/panel-beneficiarios/panel-beneficiarios.component';
import { PruebaComponent } from '../components/prueba/prueba.component';
import { NuevaTransferenciaComponent } from '../components/nueva-transferencia/nueva-transferencia.component';
import { BeneficiarioComponent } from '../components/beneficiario/beneficiario.component';
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
    NuevoBeneficiarioComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    TasasService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }


