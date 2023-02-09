import {Component, Input} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";
import {faFaceFrown} from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent {

  faFaceFrown=faFaceFrown

  filter: string = "";
  searchtext: string = "";
  listTerms: Terms[] = [];
  videos!: Video[];
  loading: boolean = true;
  page: number = 0;
  tag: string = "";
  channels!: Channel[];
  selectOption: string = "";
  channels_text!: string;
  videos_text!: string;
  results_text!: string;
  filter_str: string = "";


  constructor(public appService: AppService, public route: ActivatedRoute) {}

  ngOnInit(): void {


    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {
        switch (Number(t.tid)) {
          case 67: {
            this.searchtext = t.name
            break;
          }
          case 62: {
            this.channels_text = t.name
            break;
          }
          case 77: {
            this.videos_text = t.name
            break;
          }
          case 98: {
            this.results_text = t.name
            break;
          }
        }
      })

      this.route.queryParams.subscribe(param => {
        this.loading = true
        this.videos = [];
        this.channels = [];
        this.filter = param['search']
        this.selectOption = param['select']
        this.filter_str = this.selectOption
        this.UpdateContent(true)
      });

    });
  }//fim oninit


  UpdateContent(clean: boolean = false) {

    if (this.selectOption === "videos") {
      this.filter_str = this.videos_text
      this.appService.getVideos(this.page, this.tag, this.filter).subscribe((video) => {
        this.loading = !video;
        let vresults = <[]>video;
        if (clean) {
          this.videos = vresults;
        } else {
          this.videos = video
        }
      });
    } else {
      this.filter_str = this.channels_text
      this.appService.searchChannel(this.filter).subscribe(channel => {
        this.loading = !channel;
        let cresults = <[]>channel;
        if (clean) {
          this.channels = cresults;
        } else {
          this.channels = channel;
        }
      });
    }
  }

}

