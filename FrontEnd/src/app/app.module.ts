import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatSortModule }  from '@angular/material/sort';
import { DepositoService } from './services/deposito/deposito.service';
import { UsuarioService } from '../app/../app/services/usuarioService.service';

import { SiteFooterComponent } from '../components/site-footer/site-footer.component';
import { DialogoDesconectadoComponent } from '../components/dialogo-desconectado/dialogo-desconectado.component';
import { DepositosComponent } from './../components/depositos/depositos.component';
import { NavigatorComponent } from '../components/navigator/navigator.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { LoginComponent } from '../components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    NavigatorComponent,
    UsuarioComponent,
    SiteFooterComponent,
    DialogoDesconectadoComponent,
    MatFormFieldModule,
    DepositosComponent,
    MatInputModule,
    MatSelectModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
    // ,MatPaginatorModule
  ],
  exports: [
    // MatTableModule,
    // MatSortModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [UsuarioService, DepositoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
