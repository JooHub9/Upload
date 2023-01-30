import {Component, OnInit, Input} from '@angular/core';
import {AppService} from "../../app.service";
import {faBookmark} from "@fortawesome/free-regular-svg-icons"
import {faShareNodes, faBookmark as faBookmarkSolid, faCirclePlay} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit {
  @Input() mid!: string;
  @Input() field_video_title!: string;
  @Input() created!: string;
  @Input() field_video_description?: string;
  @Input() field_duration!: string;
  @Input() thumbnail__target_id!: string;
  @Input() user_picture!: string;
  @Input() name_1!: string;
  @Input() field_tags!: string;
  @Input() field_channel?: string;
  @Input() field_channel_1?: string;
  @Input() field_media_oembed_video!: string;
  @Input() share_type?: string;
  @Input() thematics?: boolean;
  @Input() autoplay!: string;

  faBookmark = faBookmark
  faBookmarksolid = faBookmarkSolid
  faSharenodes = faShareNodes
  faCirclePlay = faCirclePlay

  player: boolean;
  full: boolean = false;

  urlvtitle!: string;

  constructor(public appService: AppService, private router: Router) {
    this.player = false
  }

  ngOnInit(): void {

    this.urlvtitle = this.field_video_title?.replaceAll(" ", "")
    this.autoplay = this.autoplay.replace('/watch?v=', '/embed/')
        .split("&")
      + '?autoplay=0&cc_load_policy=1&cc_lang_pref=pt'
  }

  gotoVideoPage()
  {
    this.router.navigateByUrl('/video/'+this.urlvtitle,
    { state: { idvalue: this.mid } }).then(() => {
      });
    this.appService.notifyAnotherID({anotherID: true});
  }

}
