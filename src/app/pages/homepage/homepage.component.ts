import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  videos: Video[] = []
  page = 0
  channels: Channel[]=[]

  constructor(public appService: AppService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.videosList()
    this.appService.getChannels().subscribe(channel => {
      this.channels = channel
  })
  }

  videosList(): void {
    this.appService.getVideos(this.page).subscribe((video) => {
      this.videos = [...this.videos,...video]
    })
  }

  moreResults(): void {
    this.page++
    this.videosList()
  }

}
