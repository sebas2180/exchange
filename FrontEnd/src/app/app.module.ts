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
import { HistorialComponent } from '../components/historial/historial.component';
import { SiteFooterComponent } from '../components/site-footer/site-footer.component';
import { DialogoDesconectadoComponent } from '../components/dialogo-desconectado/dialogo-desconectado.component';

import { DepositosComponent } from '../components/depositos/depositos.component';
@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    NavigatorComponent,
    UsuarioComponent,
    HistorialComponent,
    SiteFooterComponent,
    DialogoDesconectadoComponent,
    DepositosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
