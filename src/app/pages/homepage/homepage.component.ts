import {Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  videos: Video[] = []

  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getVideos().subscribe((video) => {
      this.videos = video;
    })
  }
}

