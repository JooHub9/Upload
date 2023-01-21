import {Component} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";
import {faBookmark as faBookmarkFull, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faBookmark, faThumbsDown} from '@fortawesome/free-regular-svg-icons';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.scss']
})

export class VideopageComponent {

  faBookmark = faBookmark;
  faBookmarkFull = faBookmarkFull;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  objvideo = {} as Video;
  id: string = "";
  tags: string = "";

  likes: string = "";
  dislikes: string = "";
  objlikes = {} as Likes;
  objdislikes = {} as Likes;

  video_string: string [] = [];
  video: string = "";
  videoclean!: SafeResourceUrl;

  listvideoCom: VideoComment[] = [];
  objvideoCom = {} as VideoComment;
  listvideos: Video[] = [];

  body: {} = {};


  constructor(private route: ActivatedRoute, public appService: AppService, private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => {
      this.id = params['id_video'];
      this.likes="0";
      this.dislikes="0";

      setTimeout(()=>{
        this.refreshInfo(), 300
      })


    });
  }


  ngOnInit() {
    this.refreshInfo();
  }


//______ Main Function _________

  refreshInfo() {

    //---- Get the Video ----//

    this.appService.getVideo(this.id).subscribe(v => {
      this.objvideo = v[0];
      //---- Get the Tags ----//

      if (this.objvideo.field_tags != "") {
        this.tags = this.objvideo.field_tags
          .split(", ")
          .map(x => {
            return "#" + x
          })
          .toString()
          .replaceAll(",", " ")
      } else this.tags = "#tag #anothertag #onemoretag";

      //---- Change the Video ----//

      this.video_string = this.objvideo.field_media_oembed_video
        .replace('/watch?v=', '/embed/')
        .split("&")

      this.video = this.video_string[0] + '?autoplay=1&cc_load_policy=1&cc_lang_pref=pt';
      this.videoclean = this.sanitizer.bypassSecurityTrustResourceUrl(this.video);


      //---- Get the Videos for sidebar ----//

      this.appService.getAllVideosChannel(this.objvideo.field_channel_1).subscribe(vd => {
        this.listvideos = vd;

      });

    //---- Get the Comments ----//

    this.appService.getOneVideoComments(this.id).subscribe(cc => {
      this.listvideoCom = cc;
      this.objvideoCom = this.listvideoCom[0];
    });

    // -- refresh Comments

    this.appService.notifyVideoObservable.subscribe(res => {
      if (res.refreshVideo) {

        this.appService.getOneVideoComments(this.id).subscribe(cc => {
          this.listvideoCom = cc;
          this.objvideoCom = this.listvideoCom[0];
        });
      }
    })



    //---- Get Likes / Dislikes ----//


    this.appService.getLikes(this.id).subscribe(l => {
      this.objlikes = l[0];
    });

    if (this.objlikes.count === "") {
      this.objlikes.count = "0";
    this.likes = this.objlikes.count;}

    this.appService.getDislikes(this.id).subscribe(dl => {
      this.objdislikes = dl[0]
    });

    if (this.objdislikes.count === "") {
      this.objdislikes.count = "0";
    this.dislikes = this.objdislikes.count;}

    }); //fim do get video




    // -- refresh Likes

    this.appService.notifyLikesObservable.subscribe(res => {
      if (res.refreshLikes) {
        this.appService.getLikes(this.id).subscribe(l => {
          this.objlikes = l[0]
        });
      }
    });

    // -- refresh Dislikes

    this.appService.notifyDislikesObservable.subscribe(res => {
      if (res.refreshDislikes) {
        this.appService.getDislikes(this.id).subscribe(dl => {
          this.objdislikes = dl[0]
        });
      }
    });


} // fim do refreshInfo / Main Function



//---- Updating Likes / Dislikes ----//


  updateLikes() {
    this.body =
      {
        "entity_id": [this.id],
        "entity_type": ["media"],
        "flag_id": [{"target_id": "like", "target_type": "flag"}],
        "uid": ["0"]
      }
    this.appService.postLike(this.body).subscribe()

    setTimeout(() => {
      this.appService.notifyLikes({refreshLikes: true});
    }, 200);
  }

  updateDislikes() {
    this.body =
      {
        "entity_id": [this.id],
        "entity_type": ["media"],
        "flag_id": [{"target_id": "dislike", "target_type": "flag"}],
        "uid": ["0"]
      }
    this.appService.postDislike(this.body).subscribe()

    setTimeout(() => {
      this.appService.notifyDislikes({refreshDislikes: true});
    }, 200);
  }

  parseNum(str: string)
  {
    return Number(str)
  }
}

