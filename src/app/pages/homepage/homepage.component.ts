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
  channelsID: string[] = [];

  channelsIDNames: {[key:string]:string}[] = [];


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
    this.appService.getVideos(this.page, this.tag, this.filter).subscribe((video) => {
      this.loading = true;
      if (video) {
        this.loading = false
      }
      let results = <[]>video
      if (clean)
        this.videos = results
      else
        this.videos = [...this.videos, ...video]

      console.log("this.videos - ", this.videos)

      this.videos.forEach(x => {
        if(x.field_channel_1)
        {
          this.channelsID.push(x.field_channel_1)
        }
        return this.channelsID
      }) //fim do videosforeach

      console.log("this.channelsID - ", this.channelsID)

      this.appService.getoneChannel(this.channelsID).subscribe((ch) => {

        ch.forEach(x => {
          this.channelsIDNames.push({[x.nid]: x.view_node})
          console.log("this.channelsIDNames - ", this.channelsIDNames)
        })
      })
    });


  }


  returnNode(x:any) : string {
    let node
    console.log(" o id - ", x);


    node = this.channelsIDNames.find(obj => obj.hasOwnProperty(x))

    if (node) {
      console.log(node[x]);

      return node[x]
    } else {
      console.log("NOT A CHANNEL");
    }
    return ""
  }

  moreResults(): void {
    this.page++
    this.videosList()
  }

}










