import {Component, Input, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  listTerms: Terms[] = [];
  recentvideostext: string = "";
  morevideostext: string = "";
  suggestedchannelstext: string = "";
  seemoretext: string = "";
  suggestedthematicstext: string = "";
  seealltext: string = "";


  videos: Video[] = []
  page = 0
  channels: Channel[] = []
  suggested_thematic = {} as Thematics;
  t: Tags[] = []
  tag?: number = 0;

  url: string = 'https://dev-project-upskill2-grupo3-ii.pantheonsite.io/'
  obj!: Tags
  str?: string = ""
  list: Tags[] = []
  filter: string = ""


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

      /*setTimeout(() => {
        this.videosList(), 500;
      })*/
      this.appService.getTags().subscribe(
        st => {
        this.t = st
        this.list = this.t.filter(v => {
          return v.tid === this.tag
        })
        this.obj = this.list[0]
        this.str = this.obj.name
      })
      this.videosList()
    })


    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t=>{

        switch(Number(t.tid)) {
          case 68: {
            this.recentvideostext = t.name
            break;
          }
          case 73: {
            this.morevideostext = t.name
            break;
          }
          case 69: {
            this.suggestedchannelstext = t.name
            break;
          }
          case 70: {
            this.seemoretext = t.name
            break;
          }
          case 72: {
            this.suggestedthematicstext = t.name
            break;
          }
          case 71: {
            this.seealltext = t.name
            break;
          }

        }})});


  }


  videosList(): void {
    this.appService.getVideos(this.page, this.tag).subscribe((video) => {
      this.videos = [...this.videos, ...video]
    })

    this.appService.notifySearchObservable.subscribe(search=>{
      if (search.refreshVideo){
        this.appService.getSearch(this.filter).subscribe(v=> {
          this.videos = search;
        })
      }
    })
  }

  moreResults(): void {
    this.page++
    this.videosList()
  }
}
