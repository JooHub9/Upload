import {Component, Input} from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  constructor(private appService: AppService) { }

  @Input() type: string = "";
  @Input() uid : string = "";
  @Input() user_picture : string = "";
  @Input() username : string = "";
  @Input() date : string = "";
  @Input() comment : string = "";


}
