import { Component } from '@angular/core';
import {faBars, faX} from "@fortawesome/free-solid-svg-icons"


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})

export class NavbarComponent {

  faBars=faBars
  faX=faX

  isOpen=false;

  toggleMenu():void{
    this.isOpen = !this.isOpen
  }

}
