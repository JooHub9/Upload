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
  t: Tags[] = []
  tag?: number = 0;


  obj!: Tags
  str?: string = ""
  list: Tags[] = []
  filter: string = ""
  video_url: string = ""
  video_list : Video[] = []
  video_obj! : Video





  constructor(public appService: AppService, public route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.appService.getSuggestedChannels().subscribe(channel => {
      this.channels = channel

    })

    this.appService.getSuggestedThematic().subscribe(thematic => {
      this.suggested_thematic = thematic[0];

    })


    this.route.queryParams.subscribe(q => {
      this.tag = q['tag'];
      this.videos = [];


      setTimeout(() => {
        this.videosList(), 500;
      })


      this.appService.getTags().subscribe((st => {
        this.t = st
        this.list = this.t.filter(v => {
          return v.tid === this.tag
        })
        this.obj = this.list[0]
        this.str = this.obj.name
      }))

    })
  }

  videosList(): void {
    this.appService.getVideos(this.page, this.tag).subscribe((video) => {
      this.videos = [...this.videos, ...video]

    });

    this.appService.notifySearchObservable.subscribe(search=>{
      if (search.notifySearch){
        this.appService.getSearch(this.filter).subscribe(v=> {
          this.videos = [...this.videos,...search];

        })
      }
    })
  }


  moreResults(): void {
    this.page++
    this.videosList()
  }

}
