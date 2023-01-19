import { Component, OnInit } from '@angular/core'
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../app.service";


@Component({
  selector: 'app-thematic-article',
  templateUrl: './thematic-article.component.html',
  styleUrls: ['./thematic-article.component.scss']
})


export class ThematicArticleComponent implements OnInit {
  nid: string;
  thematic = {} as Thematic;
  thematic_videos: Video [] = [];

  constructor(public route: ActivatedRoute, public AppService: AppService) {
    this.nid = route.snapshot.params["nid"];
  }

  ngOnInit(): void {

    this.AppService.getThematic(this.nid).subscribe((thematic) => {
      this.thematic = thematic [0];
    });

    this.AppService.getThematicVideos(this.nid).subscribe((thematic_videos ) => {
      this.thematic_videos = thematic_videos;
    });
  }
}
