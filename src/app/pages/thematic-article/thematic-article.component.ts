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

  /*externalLinksArray : string[] = [];*/

  /*result: string[] = [];*/

  /*external_list: string = this.thematic.field_external_links;
  links_list: string =this.thematic.field_external_links_1;
  obj = {};
  obj2 = {};*/


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

      /*this.externalLinksArray.push.apply(this.externalLinksArray, this.external_list);
      this.externalLinksArray.push.apply(this.externalLinksArray, this.links_list);
      console.log(this.externalLinksArray);*/

      /*this.externalLinksArray = this.external_list.concat(this.links_list);
      console.log(this.externalLinksArray);*/

      /*this.external_list.forEach( val => this.links_list.includes(val) && this.result.push(val) );
      console.log( this.result );*/

      /*this.external_list = this.thematic.field_external_links[@iterator];*/
      /*this.external_list = this.thematic.field_external_links.split(",");*/
      /*this.obj = JSON.parse(this.external_list);
      this.obj2 = JSON.parse(this.links_list);
      console.log("external", this.obj);
      console.log("links", this.obj2);*/
    });

    this.AppService.getThematicVideos(this.nid).subscribe((thematic_videos ) => {
      this.thematic_videos = thematic_videos;
    });
  }
}
