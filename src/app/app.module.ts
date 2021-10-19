import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaHomeComponent } from './tela-home/tela-home.component';
import { ComponenteMenuComponent } from './componente-menu/componente-menu.component';
import { TelaRelatoriosComponent } from './tela-relatorios/tela-relatorios.component';
import { TelaUsuarioComponent } from './tela-usuario/tela-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { BombeirosComponent } from './bombeiros/bombeiros.component';
import { MapaApiComponent } from './mapa-api/mapa-api.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    TelaCadastroComponent,
    TelaLoginComponent,
    TelaHomeComponent,
    ComponenteMenuComponent,
    TelaRelatoriosComponent,
    TelaUsuarioComponent,
    BombeirosComponent,
    MapaApiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSidenavModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
