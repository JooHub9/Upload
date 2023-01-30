import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';




@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  keyword: string = 'field_video_title'
  data!: any[];
  item: string = ""
  faMagnifyinGlass = faMagnifyingGlass
  searchDebounce = new Subject<string>();

  constructor(public appService: AppService, private router:Router) {
    this.searchDebounce.pipe(debounceTime(1000))
      .subscribe(val => this.searchVideo(val))
  }

  ngOnInit(): void {


    //esta parte do código mostra a lista dos videos no input

    this.appService.getVideo(this.item).subscribe(v => {
      this.data = v
    })

  }

 searchVideo(filter: string) {
    this.router.navigate(['/homepage'], {
      queryParams: {
        search : filter
      }
    })
  }


}

