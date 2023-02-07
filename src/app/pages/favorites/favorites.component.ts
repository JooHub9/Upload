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
  channelsID: string[] = [];
  channelsIDNames: { [key: string]: string }[] = [];


  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getFavoritesObservable().subscribe(() => {
      this.appService.getFavorites().subscribe((favorites) => {
        this.loading = !favorites;
        this.favorites_list = favorites;

        this.favorites_list.forEach(x => {
          if (x.field_channel_1) {
            this.channelsID.push(x.field_channel_1)
          }
          return this.channelsID
        });
      });//fim do videosforeach

      this.appService.getoneChannel(this.channelsID).subscribe((ch) => {

        ch.forEach(x => {
          this.channelsIDNames.push({[x.nid]: x.view_node})
        })
      })

    }); //fim do getfavorites

    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {

        switch (Number(t.tid)) {
          case 65: {
            this.favoritestext = t.name
            break;
          }
          case 88: {
            this.Ooopstext = t.name
            break;
          }

        }
      })
    });

  }//fim do oninit


  returnNode(x: any): string {
    let node

    node = this.channelsIDNames.find(obj => obj.hasOwnProperty(x))

    if (node) {
      console.log(node[x]);

      return node[x]
    } else {
      console.log("NOT A CHANNEL");
    }
    return ""
  }
}

