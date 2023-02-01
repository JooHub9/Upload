import { Component } from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {

  channels: Channel[] = [];
  listTerms: Terms[] = [];
  channelstext: string = "";
  loading: boolean = true;

  constructor(public appService: AppService) {}

  ngOnInit(): void {

    this.appService.getChannels().subscribe(c =>
    {
      this.loading=true;
      if(c) {this.loading = false}
      this.channels = c;
      console.log("this channels - ", this.channels)
    });


    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t=>{

        if(Number(t.tid)===62)
        {
          this.channelstext = t.name
        }
        })});







  }
}
