import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  keyword: string = 'field_video_title'
  data!: any[];
  item: string = ""


  constructor(public appService: AppService) {
  }

  ngOnInit(): void {

    this.appService.getSearch(this.item).subscribe(v => {
      this.data = v
    })

    this.appService.notifySearchObservable.subscribe((filter:string) => {
     this.searchVideo(filter)
    })

  }

 searchVideo(filter: any) {
    this.item = filter;

  }
}
