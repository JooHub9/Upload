import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {faPoo} from "@fortawesome/free-solid-svg-icons"


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {
  favorites_list: Video[] = []
  faPoo = faPoo

  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getFavorites().subscribe((favorites) => {
      this.favorites_list = favorites;

    })
  }
}

