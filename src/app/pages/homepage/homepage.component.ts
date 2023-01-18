import {Component, Input, OnInit} from '@angular/core';
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
  channels: Channel[] = []
  suggested_thematic = {} as Thematics;
  t : Tags[] = []
  tag?: number = 0;

  obj!: Tags
  str: string = ""
  list: Tags[] = []




  constructor(public appService: AppService, public route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.appService.getSuggestedChannels().subscribe(channel => {
      this.channels = channel

      this.appService.getSuggestedThematic().subscribe(thematic => {
        this.suggested_thematic = thematic[0];

      })
    })

    this.route.queryParams.subscribe(q => {
      console.log(q)
      this.tag = q['tag'];
      this.videos = [];

      setTimeout(() =>{
        this.videosList(), 500;
      })

    })
  }

  videosList(): void {
    this.appService.getVideos(this.page, this.tag).subscribe((video) => {
      this.videos = [...this.videos, ...video]
      console.log(this.videos)
    })
    this.appService.getTags().subscribe((st=> {
      this.t = st
      console.log("este é o nosso t - ", this.t)
      this.list = this.t.filter(v => {return  v.tid === this.tag})
      console.log("este é o nosso list - ", this.list)
      this.obj = this.list[0]
      console.log("este é o nosso obj - ", this.obj)
      this.str = this.obj.name
    }))
//this.str=this.obj

  }

  moreResults(): void {
    this.page++
    this.videosList()
  }

}
