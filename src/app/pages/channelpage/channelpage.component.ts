import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../app.service";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-channelpage',
  templateUrl: './channelpage.component.html',
  styleUrls: ['./channelpage.component.scss']
})
export class ChannelpageComponent {

  faEllipsisVertical = faEllipsisVertical;
  id: string;
  includesComments: boolean=true;
  page = 0;
  moreSix:boolean=false;
  videotext: string = "";
  commentstext: string = "";
  nocommentstext:string=""
  morevideostext: string = "";
  objchannels = {} as Channel;
  listvideos: ChannelVideos[] = [];
  listTerms: Terms[] = [];
  listchannelCom: ContentComment[] = [];


  constructor(private route: ActivatedRoute, private appService: AppService) {
    this.id = route.snapshot.params['id_channel'];
  }

  ngOnInit(): void {

   this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;
      this.listTerms.forEach(t=>{

     switch(Number(t.tid)) {
       case 77: {
         this.videotext = t.name
         break;
       }
       case 78: {
         this.commentstext = t.name
         break;
       }
       case 90: {
         this.nocommentstext = t.name
         break;
       }
       case 73: {
         this.morevideostext = t.name
         break;
       }

     }})});


    this.appService.getoneChannel(this.id).subscribe(ch => {
      this.objchannels = ch[0];
      this.videosList()
    });

    //---- Get the Comments ----//

    this.appService.getContentComments(this.id).subscribe(cc => {
      this.listchannelCom = cc;
      this.listchannelCom.length===0 ?this.includesComments=false:this.includesComments=true
    });


    this.appService.notifyChannelObservable.subscribe(res => {
      if (res.refreshChannel) {
        this.appService.getContentComments(this.id).subscribe(cc => {
          this.listchannelCom = cc;
          this.listchannelCom.length===0 ?this.includesComments=false:this.includesComments=true
        });
      }
    })
  }

  videosList()
  {
    this.appService.getChannelsVideos(this.id,this.page).subscribe(v => {
      this.listvideos = [...this.listvideos, ...v];
      v.length>=4? this.moreSix=true: this.moreSix=false;
    })

  }

  parseNum(str: string)
  {
    return Number(str)
  }

  moreResults(): void {
    this.page++
    this.videosList()
  }
}

