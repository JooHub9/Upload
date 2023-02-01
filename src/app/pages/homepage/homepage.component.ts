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

  loading: boolean = true;

  videos: Video[] = [];
  page = 0;
  channels: Channel[] = [];
  suggested_thematic = {} as Thematics;
  //t: Tags[] = [];
  tag?: string = "";
  /*obj!: Tags;
  str?: string = "";
  list: Tags[] = [];*/
  filter: string = "";


  constructor(public appService: AppService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.appService.getSuggestedChannels().subscribe(channel => {
      this.channels = channel

    })

    this.appService.getSuggestedThematic().subscribe(thematic => {
      this.suggested_thematic = thematic[0];

    })

  this.route.queryParams.subscribe(param => {
      //this.tag = param['tag'];
      this.videos = [];
      this.filter = param['search']

     /* this.appService.getTags().subscribe(st => {
        this.t = st
        this.list = this.t.filter(v => {
          return v.tid === this.tag
        });
        this.obj = this.list[0]
        this.str = this.obj.name
      });*/
      this.videosList()
    });


    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {

        switch (Number(t.tid)) {
          case 68: {
            this.recentvideostext = t.name
            break;
          }
          case 73: {
            this.morevideostext = t.name
            break;
          }
        }
      })
    });
  } //fim oninit

  videosList(clean: boolean = false): void {
    this.appService.getVideos(this.page, this.tag,this.filter).subscribe((video) => {
      this.loading = true;
      if (video) {
        this.loading = false
      }
      let results = <[]>video
      if (clean)
        this.videos = results
      else
        this.videos = [...this.videos, ...video]
    });
  }

  moreResults(): void {
    this.page++
    this.videosList()
  }

}
