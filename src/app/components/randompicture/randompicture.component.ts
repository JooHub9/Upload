import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-randompicture',
  templateUrl: './randompicture.component.html',
  styleUrls: ['./randompicture.component.scss']
})
export class RandompictureComponent {


  @Input() uid?: string = "Anonymous";
  @Input() user_picture?: string = "";
  @Input() type?: string = "";
  @Input() email!: string;

  url!: string;

  count_anonymous: number = 500;
  image_number = this.randomNumber(this.count_anonymous)

  randomNumber(count_images:number) {
    return Math.floor(Math.random() * count_images);
  }

  urlForm = "https://robohash.org/Anonymous" + this.image_number + "?set=any&bgset=any"



  ngOnInit(): void {
    this.url = "https://robohash.org/" + this.email + "?set=any&bgset=any"
    console.log("uid - ",this.uid)
  }
}
