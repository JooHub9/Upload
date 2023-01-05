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
  page = 1


  constructor(public appService: AppService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.videosList()
  }

  videosList(): void {
    this.appService.getVideos(this.page).subscribe(video => {
      //this.videos = video;
      this.videos = [...video]
    })
  }

  moreResults(): void {
    this.page++
    this.videosList()
  }

}
