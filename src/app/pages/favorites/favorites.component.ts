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

  listTerms: Terms[] = [];
  favoritestext: string = "";
  Ooopstext: string = "";
  loading: boolean = true;


  constructor(public appService: AppService) {}

  ngOnInit(): void {
    this.appService.getFavorites().subscribe((favorites) => {
      this.loading = !favorites;
      this.favorites_list = favorites;
    });

    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t=>{

        switch(Number(t.tid)) {
          case 65: {
            this.favoritestext = t.name
            break;
          }
          case 88: {
            this.Ooopstext = t.name
            break;
          }

        }})});



  }
}

