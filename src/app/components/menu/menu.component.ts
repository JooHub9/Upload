import {Component, OnInit, Input} from '@angular/core';
import {
  faHome,
  faBarsStaggered,
  faClapperboard,
  faPlay,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons"
import {AppService} from "../../app.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  /*faIcons*/
  faHome = faHome;
  faBarsStaggered = faBarsStaggered;
  faClapperboard = faClapperboard;
  faPlay = faPlay;
  faBookmark = faBookmark;



  /*Variables*/
  tags: Tags[] = [];
  listTerms: Terms[] = [];

  channelstext: string = "";
  thematicstext: string = "";
  favoritestext: string = "";
  tagstext: string = "";
  searchvideotext: string = "";


  @Input() isMenu! : boolean;

  constructor(public appService: AppService) {}

  ngOnInit(): void {
    this.appService.getTags().subscribe((tag) => {
      this.tags = tag;
    })


    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t=>{

        switch(Number(t.tid)) {
          case 62: {
            this.channelstext = t.name
            break;
          }
          case 63: {
            this.thematicstext = t.name
            break;
          }

          case 65: {
            this.favoritestext = t.name
            break;
          }
          case 66: {
            this.tagstext = t.name
            break;
          }
          case 67: {
            this.searchvideotext = t.name
            break;
          }

        }})});


  }
}
