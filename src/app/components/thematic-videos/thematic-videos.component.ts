import {Component, Input, OnInit} from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-thematic-videos',
  templateUrl: './thematic-videos.component.html',
  styleUrls: ['./thematic-videos.component.scss']
})
export class ThematicVideosComponent implements OnInit {
  @Input() mid!: string;
  @Input() field_video_title!: string;
  @Input() thumbnail__target_id!: string;
  @Input() field_duration!: string;
  @Input() created!: string;
  @Input() user_picture!: string;
  @Input() name_1!: string;
  @Input() field_video_description!: string;
  @Input() field_tags!: string;


  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
  }
}
