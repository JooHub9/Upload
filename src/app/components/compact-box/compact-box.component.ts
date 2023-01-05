import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-compact-box',
  templateUrl: './compact-box.component.html',
  styleUrls: ['./compact-box.component.scss']
})
export class CompactBoxComponent {

  @Input() nid!: string;
  @Input() title!: string;
  @Input() field_channel_cover!: string;
  @Input() user_picture!: string;
  @Input() name!: string;


}
