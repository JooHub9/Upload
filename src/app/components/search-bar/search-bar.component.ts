import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  keyword: string = 'field_video_title'
  data!: any[];
  str: string = ""


  constructor(public appService: AppService) {
  }

  ngOnInit(): void {

    this.appService.getVideos().subscribe(v => {
      this.data = v
    })

    this.appService.notifySearchObservable.subscribe((filter:string) => {
     this.searchVideo(filter)
    })

  }

 searchVideo(filter: any) {
    this.str = filter;
    console.log(this.str)
    //this.appService.getSearch(this.str).subscribe(v => {
      //this.data = v
    //})
  }
}
