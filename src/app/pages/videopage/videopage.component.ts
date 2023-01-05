import {Component} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";
import {faFlag as faFlagFull, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faFlag, faThumbsDown} from '@fortawesome/free-regular-svg-icons';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.scss']
})
export class VideopageComponent {

  faFlag = faFlag;
  faFlagFull = faFlagFull;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  objvideo = {} as Video;
  id: string = "";
  tags: string = "";
  like: string = "0";
  dislike: string = "0";


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

      if (this.objvideo.field_like != "")
        this.like = this.objvideo.field_like;

      if (this.objvideo.field_dislike != "")
        this.dislike = this.objvideo.field_dislike;

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

      this.video = this.video_string[0];
      this.videoclean = this.sanitizer.bypassSecurityTrustResourceUrl(this.video);

      //---- Get the Comments ----//

      this.appService.getOneVideoComments(this.id).subscribe(cc => {
        this.listvideoCom.push(...cc);
        this.objvideoCom = this.listvideoCom[0];
      });

      //---- Get the Videos for sidebar ----//

      this.appService.getVideos().subscribe(vd =>
        this.listvideos = vd);

    });
  }

//---- Updating Likes / Dislikes ----//

  /*updateLikes ()
  {
    this.appService.postLikeDislike(this.id, this.like, this.dislike).subscribe(ld =>

    );

  }*/
}

