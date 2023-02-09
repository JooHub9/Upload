import {Component, Input} from '@angular/core';
import {faBars, faX} from "@fortawesome/free-solid-svg-icons"
import {AppService} from "../../app.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})

export class NavbarComponent {

  faBars = faBars
  faX = faX

  isOpen = false;

  toggleMenu(): void {
    this.isOpen = !this.isOpen
  }

  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.notifyToggleObservable.subscribe(r => {
      if (r.refreshMenu) {
        this.isOpen = false;
      }
    })
  }
}
