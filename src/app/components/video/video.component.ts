import {Component, OnInit, Input} from '@angular/core';
import {AppService} from "../../app.service";
import {faBookmark} from "@fortawesome/free-regular-svg-icons"
import {faShareNodes, faBookmark as faBookmarkSolid, faCirclePlay} from "@fortawesome/free-solid-svg-icons";

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
  @Input() thematics? : boolean;


  faBookmark = faBookmark
  faBookmarksolid = faBookmarkSolid
  faSharenodes = faShareNodes
  faCirclePlay = faCirclePlay

  player:boolean;
  full : boolean = false;


  constructor(public appService: AppService) {
    this.player=false

  }

  ngOnInit(): void {}

}
