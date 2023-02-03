import { Component, OnInit } from '@angular/core'
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../app.service";


@Component({
  selector: 'app-thematic-article',
  templateUrl: './thematic-article.component.html',
  styleUrls: ['./thematic-article.component.scss']
})


export class ThematicArticleComponent implements OnInit {
  nid: string;
  thematic = {} as Thematic;
  thematic_videos: Video [] = [];

  videostext: string = "";
  listTerms: Terms[] = [];

  channelsID: string[] = [];
  channelsIDNames: {[key:string]:string}[] = [];

  constructor(public route: ActivatedRoute, public AppService: AppService) {
    this.nid = route.snapshot.params["nid"];
  }

  ngOnInit(): void {

    this.AppService.getThematic(this.nid).subscribe((thematic) => {
      this.thematic = thematic [0];
    });

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
      })});

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
}
