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
  searchtext: string = "";

  loading: boolean = true;

  videos: Video[] = [];
  page = 0;
  channels: Channel[] = [];
  suggested_thematic = {} as Thematics;
  tag?: string = "";
  filter: string = "";
  channelsID: string[] = [];
  channelsIDNames: {[key:string]:string}[] = [];


  constructor(public appService: AppService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {

   /* this.appService.getSuggestedChannels().subscribe(channel => {
      this.channels = channel
    })

    this.appService.getSuggestedThematic().subscribe(thematic => {
      this.suggested_thematic = thematic[0];

    })*/

    this.route.queryParams.subscribe(param => {
      //this.tag = param['tag'];
      this.videos = [];
      this.filter = param['search']
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
          case 92: {
            this.searchtext = t.name
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
      if (clean) {
        this.videos = results
      } else
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
    }); //fim do getvideos


  }


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

  moreResults(): void {
    this.page++
    this.videosList()
  }
}










