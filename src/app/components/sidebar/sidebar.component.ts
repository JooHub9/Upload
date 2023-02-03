import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  channelsraw: Channel[] = []
  channels: Channel[] = []
  suggested_thematic = {} as Thematics;

  listTerms: Terms[] = [];
  suggestedchannelstext: string = "";
  seemoretext: string = "";
  suggestedthematicstext: string = "";
  seealltext: string = "";

  constructor(public appService: AppService, public route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.appService.getSuggestedChannels().subscribe(channel => {
      this.channelsraw = channel

      this.channels= this.channelsraw.map(x=>({...x, view_node : x.view_node.slice(4)}));

      console.log("this.channels - ", this.channels)

    })

    this.appService.getSuggestedThematic().subscribe(thematic => {
      this.suggested_thematic = thematic[0];

    })

    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {

        switch (Number(t.tid)) {
          case 69: {
            this.suggestedchannelstext = t.name
            break;
          }
          case 70: {
            this.seemoretext = t.name
            break;
          }
          case 72: {
            this.suggestedthematicstext = t.name
            break;
          }
          case 71: {
            this.seealltext = t.name
            break;
          }

        }
      })
    });

  }
}
