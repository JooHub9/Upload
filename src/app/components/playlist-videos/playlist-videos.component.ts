import {Component, Input, OnInit} from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-playlist-videos',
  templateUrl: './playlist-videos.component.html',
  styleUrls: ['./playlist-videos.component.scss']
})
export class PlaylistVideosComponent implements OnInit {
  @Input() mid!: string;
  @Input() field_video_title!: string;
  @Input() thumbnail__target_id!: string;
  @Input() field_duration!: string;
  @Input() type!: string;

  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
  }
}
