import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input() type: string = "";
  @Input() uid : string = "";
  @Input() user_picture : string = "";
  @Input() username : string = "";
  @Input() date : string = "";
  @Input() comment : string = "";

  count_images: number = 7;

  image_number = this.randomNumber(this.count_images)

  randomNumber(count_images:number) {
    return Math.floor(Math.random() * count_images);
  }

}
