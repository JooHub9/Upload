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
  morevideostext: string = "";

  loading: boolean = true;

  page = 0;
  t: Tags[] = [];
  tag?: number = 0;
  obj!: Tags;
  str?: string = "";
  list: Tags[] = [];
  filter: string = "";


  channelsID: string[] = [];
  channelsIDNames: {[key:string]:string}[] = [];

  constructor(public route: ActivatedRoute, public AppService: AppService) {
    this.nid = route.snapshot.params["nid"];
  }

  ngOnInit(): void {

    this.AppService.getThematic(this.nid).subscribe((thematic) => {
      this.thematic = thematic [0];

      this.external_list = this.thematic.field_external_links.split(",");
      this.links_list = this.thematic.field_external_links_1.split(",");

    });

    /*videosList(clean: boolean = false): void {
      this.AppService.getThematicVideos(this.nid).subscribe((thematic_videos) => {
        this.thematic_videos = thematic_videos;
      });

    }*/

    this.AppService.getThematicVideos(this.nid).subscribe((thematic_videos ) => {
      this.thematic_videos = thematic_videos;


      this.thematic_videos.forEach(x => {
        if(x.field_channel_1)
        {
          this.channelsID.push(x.field_channel_1)
        }
        return this.channelsID
      }) //fim do videosforeach

      this.AppService.getoneChannel(this.channelsID).subscribe((ch) => {

        ch.forEach(x => {
          this.channelsIDNames.push({[x.nid]: x.view_node})
        })
      })

    });//fim da getThematicVideos


    this.AppService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t=>{

        if(Number(t.tid)===77)
        {
          this.videostext = t.name
        }

        if(Number(t.tid)===73)
        {
          this.morevideostext = t.name
        }

      })});

    this.route.queryParams.subscribe(param => {
      this.tag = param['tag'];
      this.thematic_videos = [];
      this.filter = param['search']


      this.AppService.getTags().subscribe(st => {
        this.t = st
        this.list = this.t.filter(v => {
          return v.tid === this.tag
        });
        this.obj = this.list[0]
        this.str = this.obj.name
      });
      this.thematic_videosList()
    });

}//fim do oninit

  returnNode(x:any) : string {
    let node

    node = this.channelsIDNames.find(obj => obj.hasOwnProperty(x))

    if (node) {
      console.log(node[x]);

      return node[x]
    } else {
      console.log("NOT A CHANNEL");
    }
    return ""
  }

  thematic_videosList(clean: boolean = false): void {
    this.AppService.getThematicVideos(this.nid, this.page, this.tag, this.filter).subscribe((thematic_videos) => {
      /*this.thematic_videos = thematic_videos;*/
      this.loading = true;
      if (thematic_videos) {
        this.loading = false
      }
      let results = <[]>thematic_videos
      if (clean)
        this.thematic_videos = results
      else
        this.thematic_videos = [...this.thematic_videos, ...thematic_videos]
    });
  }

  moreResults(): void {
    this.page++
    this.thematic_videosList()
  }

}
