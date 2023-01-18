import {Component, Input} from '@angular/core';
import {AppService} from "../../app.service";
import {faEllipsisVertical, faFlag} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  faEllipsisVertical = faEllipsisVertical;
  faFlag = faFlag;

  visible: boolean = false;
  reported: boolean = false;


  constructor(public appService: AppService) {}

  @Input() uid: string = "";
  @Input() user_picture: string = "";
  @Input() username: string = "";
  @Input() date: string = "";
  @Input() comment: string = "";
  @Input() email: string = "";
  @Input() idComment: string = "";
  @Input() channel!: boolean;

  toggleReportText() {
    this.visible = !this.visible;
  }


}
