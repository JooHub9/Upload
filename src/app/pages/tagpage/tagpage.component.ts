import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tagpage',
  templateUrl: './tagpage.component.html',
  styleUrls: ['./tagpage.component.scss']
})
export class TagpageComponent {

  listTerms: Terms[] = [];
  tagtext: string = "";
  morevideostext: string = "";

  t: Tags[] = [];
  tag?: string = "";
  obj!: Tags;
  str?: string = "";
  list: Tags[] = [];
  filter: string = "";
  videos: Video[] = [];
  page: number = 0;
  channelsID: string[] = [];
  channelsIDNames: {[key:string]:string}[] = [];

  loading: boolean = true;

  constructor(public appService: AppService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.tag = param['tag'];
      this.videos = [];


      this.appService.getTags().subscribe(st => {
        this.t = st
        this.list = this.t.filter(v => {
          return v.name === this.tag
        });
        this.obj = this.list[0]
        this.str = this.obj.name
      });
      this.getVideosbyTag()
    });

    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {

        switch (Number(t.tid)) {
          case 66: {
            this.tagtext = t.name
            break;
          }
          case 73: {
            this.morevideostext = t.name
            break;
          }
        }
      })
    });
  }//fim do OnInit

  getVideosbyTag(): void {
    this.appService.getVideos(this.page, this.tag).subscribe((video) => {
      this.loading = true;
      if (video) {
        this.loading = false
        this.videos = [...this.videos, ...video]


      this.videos.forEach(x => {
        if(x.field_channel_1)
        {
          this.channelsID.push(x.field_channel_1)
        }
        return this.channelsID
      }) //fim do videosforeach

      this.appService.getoneChannel(this.channelsID).subscribe((ch) => {

        ch.forEach(x => {
          this.channelsIDNames.push({[x.nid]: x.view_node})
        })
      })

      }// fim do if
    }); //fim do get videos
  }

/*  moreResults(): void {
    this.page++
    this.getVideosbyTag()
  }*/

  returnNode(x:any) : string {
    let node
    node = this.channelsIDNames.find(obj => obj.hasOwnProperty(x))

    if (node) {
      return node[x]
    }
    return ""
  }

}




