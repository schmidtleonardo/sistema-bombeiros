import { AdminGuard } from './auth/admin.guard';
import { ComponenteMenuComponent } from './componente-menu/componente-menu.component';
import { TelaRelatoriosComponent } from './tela-relatorios/tela-relatorios.component';
import { TelaUsuarioComponent } from './tela-usuario/tela-usuario.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { TelaHomeComponent } from './tela-home/tela-home.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: TelaLoginComponent },
  // { path: 'cool' },
  {
    path: '',
    component: ComponenteMenuComponent,
    children: [
      { path: 'home', component: TelaHomeComponent },
      {
        path: 'cadastros',
        component: TelaCadastroComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'usuarios',
        component: TelaUsuarioComponent,
        canActivate: [AdminGuard],
      },
      { path: 'relatorios', component: TelaRelatoriosComponent },
      // { path: 'login', component: TelaLoginComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
