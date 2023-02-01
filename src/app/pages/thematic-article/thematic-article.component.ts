import { Component, OnInit } from '@angular/core'
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../app.service";
import {iterator} from "rxjs/internal/symbol/iterator";
import {isIterable} from "rxjs/internal/util/isIterable";


@Component({
  selector: 'app-thematic-article',
  templateUrl: './thematic-article.component.html',
  styleUrls: ['./thematic-article.component.scss']
})


export class ThematicArticleComponent implements OnInit {
  nid: string;
  thematic = {} as Thematic;
  thematic_videos: Video [] = [];
  external_list: string[] = [];
  links_list: string[] = [];


  videostext: string = "";
  listTerms: Terms[] = [];


  constructor(public route: ActivatedRoute, public AppService: AppService) {
    this.nid = route.snapshot.params["nid"];
  }

  ngOnInit(): void {

    this.AppService.getThematic(this.nid).subscribe((thematic) => {
      this.thematic = thematic [0];

      this.external_list = this.thematic.field_external_links.split(",");
      this.links_list = this.thematic.field_external_links_1.split(",");
      console.log(this.external_list);
      console.log(this.links_list);
    });

    this.AppService.getThematicVideos(this.nid).subscribe((thematic_videos ) => {
      this.thematic_videos = thematic_videos;
    });

    this.AppService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t=>{

        if(Number(t.tid)===77)
        {
          this.videostext = t.name
        }
      })});




  }
}
