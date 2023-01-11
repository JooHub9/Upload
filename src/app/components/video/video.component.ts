import {Component, OnInit, Input} from '@angular/core';
import {AppService} from "../../app.service";
import {faBookmark} from "@fortawesome/free-regular-svg-icons"
import {faShareNodes} from "@fortawesome/free-solid-svg-icons";

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

  bookmark = faBookmark
  sharenodes = faShareNodes

  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
  }


}
