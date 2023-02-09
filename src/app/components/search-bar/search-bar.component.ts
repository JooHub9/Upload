import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  keyword: string = ''
  data!: any[];
  item: string = ""
  faMagnifyinGlass = faMagnifyingGlass
  waitTime = 500;
  timeout: any;
  selectOption: string = "videos"
  listTerms: Terms[] = [];
  channels_text: string = "";
  videos_text: string = "";
  placeholder_text: string = "";
  name: string = ""


  constructor(public appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {
        switch (Number(t.tid)) {
          case 62: {
            this.channels_text = t.name
            break;
          }
          case 77: {
            this.videos_text = t.name
            break;
          }
          case 94: {
            this.placeholder_text = t.name
            break;
          }
        }
      })
    });
  } //fim oninit


  searchVideo(filter: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.router.navigate(['/search'], {
        queryParams: {
          search: filter,
          select: this.selectOption,
        }
      });
    }, this.waitTime);
  }

  selectChange(event: any) {
    this.selectOption = event.target.value;
    this.searchVideo(this.selectOption)
    this.name = ""
  }

}

