import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-randompicture',
  templateUrl: './randompicture.component.html',
  styleUrls: ['./randompicture.component.scss']
})
export class RandompictureComponent {

  @Input() uid? : string = "Anonymous";
  @Input() user_picture? : string = "";

  count_images: number = 7;

  image_number = this.randomNumber(this.count_images)

  randomNumber(count_images:number) {
    return Math.floor(Math.random() * count_images);

  }


}
