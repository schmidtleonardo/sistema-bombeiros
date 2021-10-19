import { ComponenteMenuComponent } from './componente-menu/componente-menu.component';
import { TelaRelatoriosComponent } from './tela-relatorios/tela-relatorios.component';
import { TelaUsuarioComponent } from './tela-usuario/tela-usuario.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { TelaHomeComponent } from './tela-home/tela-home.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: TelaLoginComponent},
  {path: "", component: ComponenteMenuComponent,
    children: [
      {path: 'home', component: TelaHomeComponent},
      {path: 'cadastro', component: TelaCadastroComponent},
      {path: 'usuario', component: TelaUsuarioComponent},
      {path: 'relatorio', component: TelaRelatoriosComponent},
      {path: 'logout', component: TelaLoginComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
