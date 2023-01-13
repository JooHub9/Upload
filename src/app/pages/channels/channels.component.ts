import { Component } from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {


  channels: Channel[] = [];

  constructor(public appService: AppService) {}

  ngOnInit(): void {

    this.appService.getChannels().subscribe(c =>
    {
      this.channels = c;
    });
  }
}
