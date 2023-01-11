import { Component, OnInit } from '@angular/core';
import {faHome, faBarsStaggered, faClapperboard, faPlay, faBookmark} from "@fortawesome/free-solid-svg-icons"
import {AppService} from "../../app.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  faHome = faHome;
  faBarsStaggered = faBarsStaggered;
  faClapperboard = faClapperboard;
  faPlay = faPlay;
  faBookmark = faBookmark;

  tags: Tags[] = []

  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getTags().subscribe((tag) => {
      this.tags = tag;
    })
  }
}
