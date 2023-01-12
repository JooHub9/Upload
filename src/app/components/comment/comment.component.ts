import {Component, Input} from '@angular/core';
import {AppService} from "../../app.service";
import {faEllipsisVertical, faFlag} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  faEllipsisVertical=faEllipsisVertical;
  faFlag=faFlag;

  visible : boolean = false;
  reported : boolean = false;

  constructor(private appService: AppService) { }

  @Input() type: string = "";
  @Input() uid : string = "";
  @Input() user_picture : string = "";
  @Input() username : string = "";
  @Input() date : string = "";
  @Input() comment : string = "";

  toggleReportText()
  {
    this.visible = !this.visible;
  }

  toggleReport()
  {
    this.reported = !this.reported;
  }
}
