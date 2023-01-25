import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../app.service";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-channelpage',
  templateUrl: './channelpage.component.html',
  styleUrls: ['./channelpage.component.scss']
})
export class ChannelpageComponent {


  faEllipsisVertical = faEllipsisVertical;

  id: string = "";

  video: string = "";
  comments: string = "";

  objchannels = {} as Channel;
  listvideos: ChannelVideos[] = [];

  listTerms: Terms[] = [];
  objTerms = {} as Terms;

  listchannelCom: ContentComment[] = [];
  objchannelCom = {} as ContentComment;

  constructor(private route: ActivatedRoute, private appService: AppService) {
    this.id = route.snapshot.params['id_channel'];
  }

  ngOnInit(): void {

   this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t=>{

     switch(Number(t.tid)) {
       case 77: {
         this.video = t.name
         break;
       }
       case 78: {
         this.comments = t.name
         break;
       }

     }})});




    this.appService.getoneChannel(this.id).subscribe(ch => {
      this.objchannels = ch[0];


      this.appService.getChannelsVideos(this.id).subscribe(v =>
        this.listvideos = v);
    });

    //---- Get the Comments ----//

    this.appService.getContentComments(this.id).subscribe(cc => {
      this.listchannelCom = cc;
    });


    this.appService.notifyChannelObservable.subscribe(res => {
      if (res.refreshChannel) {
        this.appService.getContentComments(this.id).subscribe(cc => {
          this.listchannelCom = cc;
        });
      }
    })
  }

  parseNum(str: string)
  {
    return Number(str)
  }
}

