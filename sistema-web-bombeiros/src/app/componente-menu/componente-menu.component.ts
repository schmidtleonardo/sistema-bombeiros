import { AuthService } from './../auth/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-componente-menu',
  templateUrl: './componente-menu.component.html',
  styleUrls: ['./componente-menu.component.scss'],
  animations: [
    trigger('slideIn', [
      state(
        'in',
        style({
          transform: 'translateX(-200px)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(0px)',
        })
      ),
      transition('in => out', animate('350ms ease-in')),
      transition('out => in', animate('350ms ease-in')),
    ]),
  ],
})
export class ComponenteMenuComponent implements OnInit {
  classeMobile: String = 'none';
  classeDesktop: String = '';
  classeBotao: String = '';
  windowWidth = window.innerWidth;
  slideInState = 'in';
  isOpen = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (this.windowWidth > 670){
      this.isOpen = false;
    }
  }

  abrirMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
