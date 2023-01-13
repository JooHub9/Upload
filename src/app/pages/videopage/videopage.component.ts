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
  favorite: boolean = false;

  objlikes = {} as Likes;
  objdislikes = {} as Likes;


  video_string: string [] = [];
  video: string = "";
  videoclean!: SafeResourceUrl;

  listvideoCom: VideoComment[] = [];
  objvideoCom = {} as VideoComment;
  listvideos: Video[] = [];


  constructor(private route: ActivatedRoute, private appService: AppService, private sanitizer: DomSanitizer) {
    this.id = route.snapshot.params['id_video'];
  }


  ngOnInit(): void {

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

      //---- Get Likes / Dislikes ----//

      /*this.appService.getLikes(this.id).subscribe(l => {
        this.objlikes = l[0]
      });

      this.appService.getDislikes(this.id).subscribe(dl => {
        this.objdislikes = dl[0]
      });*/

      //---- Change the Video ----//

      this.video_string = this.objvideo.field_media_oembed_video
        .replace('/watch?v=', '/embed/')
        .split("&")

      this.video = this.video_string[0];
      this.videoclean = this.sanitizer.bypassSecurityTrustResourceUrl(this.video);


      //---- Get the Comments ----//

      this.appService.getOneVideoComments(this.id).subscribe(cc => {
        this.listvideoCom = cc;
        this.objvideoCom = this.listvideoCom[0];
      });


      this.appService.notifyVideoObservable$.subscribe(res => {
        if (res.refreshVideo) {

          this.appService.getOneVideoComments(this.id).subscribe(cc => {
            this.listvideoCom = cc;
            this.objvideoCom = this.listvideoCom[0];
          });
        }
      })


      //---- Get the Videos for sidebar ----//

      this.appService.getVideos().subscribe(vd =>
        this.listvideos = vd);
    })
  }

  toggleIcon() {
    this.favorite = !this.favorite;
  }


//---- Updating Likes / Dislikes ----//


  updateLikesDislikes(type: string) {
    /*return () => {*/
    /* if (type === "like") {
       this.likes++;
       console.log(this.likes);
     } else {
       this.dislikes++;
       console.log(this.dislikes);
     }*/
  }

}



