import {Component, Input} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent {

  filter: string = "";
  searchtext: string = "";
  listTerms: Terms[] = [];
  videos: Video[] = [];
  loading: boolean = true;
  page: number = 0;
  tag: string = "";
  channels: Channel[] = [];
  selectOption: string="";

  constructor(public appService: AppService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      //this.tag = param['tag'];
      this.videos = [];
      this.filter = param['search']
      this.selectOption = param['select']
      this.UpdateContent()
    });

  }//fim oninit


  UpdateContent() {
    if (this.selectOption === "videos") {
      this.appService.getVideos(this.page, this.tag, this.filter).subscribe((video) => {
        this.loading = !video;
        this.videos = video
      });
    } else {
      this.appService.searchChannel(this.filter).subscribe(channel => {
        this.loading = !channel;
        this.channels = channel;
      });
    }

    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {
        switch (Number(t.tid)) {
          case 92: {
            this.searchtext = t.name
            break;
          }
        }
      })
    });
  }//fim do update
}

