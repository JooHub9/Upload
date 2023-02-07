import {Component} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";
import {faBookmark as faBookmarkFull, faThumbsUp as faThumbsUpFull, faThumbsDown as faThumbsDownFull} from '@fortawesome/free-solid-svg-icons';
import {faBookmark, faThumbsDown as faThumbsDownEmpty,faThumbsUp as faThumbsUpEmpty} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.scss']
})

export class VideopageComponent {

  faBookmark = faBookmark;
  faBookmarkFull = faBookmarkFull;

  faThumbsUpFull = faThumbsUpFull;
  faThumbsDownFull=faThumbsDownFull;

  faThumbsDownEmpty = faThumbsDownEmpty;
  faThumbsUpEmpty= faThumbsUpEmpty;

  objvideo = {} as Video;

  listtagsinicio: Tags[] = [];

  urlvideotitle: string = "";
  includesComments: boolean = true;

  loading: boolean = true;

  id: any;
  umastring?: any;
  logo: string = "";
  urlvtitle: string = "";
  urlctitle: string = "";

  tags: string = "";

  commentstext: string = "";
  nocommentstext: string = ""

  listTerms: Terms[] = [];

  toDislike: boolean = false;
  toLike: boolean = false;

  likes: string = "0";
  dislikes: string = "0";
  objlikes = {} as Likes;
  objdislikes = {} as Likes;

  video_string: string [] = [];
  video: string = "";
  objtags: string = "";
  listtags: string[] = [];

  listvideoCom: VideoComment[] = [];
  objvideoCom = {} as VideoComment;
  listvideos: Video[] = [];
  listvideostags: Video[] = [];


  body: {} = {};

  constructor(private route: ActivatedRoute, public appService: AppService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.urlvtitle = params['title'];

      this.appService.getIDByTitle(this.urlvtitle).subscribe(v => {
        this.id = v.mid[0].value
        this.refreshInfo()
      })

    })
  }

//______ Main Function _________

  refreshInfo() {

    //---- Get Terms ----//

    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;
      this.listTerms.forEach(t => {

        if (String(t.tid) === "78") {
          this.commentstext = t.name;
        }
        if (String(t.tid) === "90") {
          this.nocommentstext = t.name;
        }
      })
    });

    //---- Get the Video ----//

    this.appService.getVideo(this.id).subscribe(v => {
      this.objvideo = v[0];

      if(this.objvideo.field_channel_1)
      {
        this.appService.getoneChannel([this.objvideo.field_channel_1]).subscribe(ch => {
          this.urlctitle = ch[0].view_node.slice(4)
          this.logo=ch[0].field_logo
        })
      }

      //---- Get the Tags ----//

      if (this.objvideo.field_tags != "") {
        this.tags = this.objvideo.field_tags
          .split(", ")
          .map(x => {
            this.listtags.push(x)
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

      //---- Get the Videos for sidebar ----//

      this.appService.getAllVideosChannel(this.objvideo.field_channel_1).subscribe(vd => {
        this.listvideos = vd;






      });

      this.appService.getAllVideosChannelTags(this.objvideo.field_tags).subscribe(vd => {
        this.listvideostags = vd;
      });

      //---- Get the Comments ----//

      this.appService.getOneVideoComments(this.id).subscribe(cc => {
        this.listvideoCom = cc;
        this.objvideoCom = this.listvideoCom[0];
        this.listvideoCom.length === 0 ? this.includesComments = false : this.includesComments = true
      });

      // -- refresh Comments

      this.appService.notifyVideoObservable.subscribe(res => {
        if (res.refreshVideo) {
          this.appService.getOneVideoComments(this.id).subscribe(cc => {
            this.listvideoCom = cc;
            this.objvideoCom = this.listvideoCom[0];
            this.listvideoCom.length === 0 ? this.includesComments = false : this.includesComments = true
          });
        }
      })

      //---- Get Likes / Dislikes ----//

      this.appService.getLikes(this.id).subscribe(l => {
        this.objlikes = l[0]
        this.likes = l[0].count

      })

      this.appService.getDislikes(this.id).subscribe(dl => {
        this.objdislikes = dl[0]
        this.dislikes = dl[0].count

      })

    }); //fim do get video
    // );


    //---- Get the Tags ----//

    this.appService.getTags().subscribe((tag) => {
      this.listtagsinicio = tag;
    })

    // -- refresh Likes

    this.appService.notifyLikesObservable.subscribe(res => {
      if (res.refreshLikes) {
        this.appService.getLikes(this.id).subscribe(l => {
          this.objlikes = l[0];
          this.likes = l[0].count;
        });
      }
    });

    // -- refresh Dislikes

    this.appService.notifyDislikesObservable.subscribe(res => {
      if (res.refreshDislikes) {
        this.appService.getDislikes(this.id).subscribe(dl => {
          this.objdislikes = dl[0]
          this.dislikes = dl[0].count
        });
      }
    });

  } // fim do da refreshInfo()


//---- Updating Likes / Dislikes ----//


  updateLikes() {
    this.toDislike = false;
    this.toLike = true;
    this.body =
      {
        "entity_id": [this.id],
        "entity_type": ["media"],
        "flag_id": [{"target_id": "like", "target_type": "flag"}],
        "uid": ["0"]
      }
    this.appService.postLike(this.body).subscribe(() => {
      this.appService.notifyLikes({refreshLikes: true});
    })
  }

  updateDislikes() {
    this.toDislike = true;
    this.toLike = false;
    this.body =
      {
        "entity_id": [this.id],
        "entity_type": ["media"],
        "flag_id": [{"target_id": "dislike", "target_type": "flag"}],
        "uid": ["0"]
      }
    this.appService.postDislike(this.body).subscribe(() => {
      this.appService.notifyDislikes({refreshDislikes: true});
    })
  }

  parseNum(str: string) {
    return Number(str)
  }

}

