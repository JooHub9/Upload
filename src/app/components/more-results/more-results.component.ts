import {Component, Input} from '@angular/core';
import {AppService} from "../../app.service";


@Component({
  selector: 'app-more-results',
  templateUrl: './more-results.component.html',
  styleUrls: ['./more-results.component.scss']
})
export class MoreResultsComponent {
  @Input() page!: number;
  @Input() list!: any[];


  constructor(public appService: AppService) {
  }

  ngOnInit(): void {

  }

  moreResults(): void {
    this.page++
  }
}
