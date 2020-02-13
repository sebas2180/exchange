import { DepositosComponent } from './../components/depositos/depositos.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { UsuarioService } from '../app/../app/services/usuarioService.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { AppComponent } from './app.component';
import { NavigatorComponent } from '../components/navigator/navigator.component';
import { UsuarioComponent } from '../components/usuario/usuario.component';

import { SiteFooterComponent } from '../components/site-footer/site-footer.component';
import { DialogoDesconectadoComponent } from '../components/dialogo-desconectado/dialogo-desconectado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepositoService } from './services/deposito/deposito.service';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    NavigatorComponent,
    UsuarioComponent,
    SiteFooterComponent,
    DialogoDesconectadoComponent,
    DepositosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [UsuarioService, DepositoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
