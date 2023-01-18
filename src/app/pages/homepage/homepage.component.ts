import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  videos: Video[] = []
  page = 0
  channels: Channel[] = []
  suggested_thematic = {} as Thematics
  thematic_id!: string;
  thematics: Thematics[] = []
  list_ids: string [] = []


  //id!: number;


  /*----------Random ID---------*/
  //randomNumber(id: number) {
  //return Math.floor(Math.random() * id);
  //}

  constructor(public appService: AppService, public route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.videosList()
    this.appService.getChannels().subscribe(channel => {
      this.channels = channel

      this.appService.getThematics().subscribe(thematic => {
        this.thematics = thematic;

        this.thematics.forEach(t => {
          this.list_ids.push(t.nid)
        });

        this.thematic_id = String(Math.floor(Math.random() * this.list_ids.length));

        this.appService.getThematicsNid(this.list_ids[Number(this.thematic_id)]).subscribe(t => {
          this.suggested_thematic = t[0]
          console.log(this.suggested_thematic.field_thumbnail_article)
        })
      })
    })
  }

      videosList():void {
        this.appService.getVideos(this.page).subscribe((video) => {
          this.videos = [...this.videos, ...video]
        })
      }


  moreResults(): void {
    this.page++
    this.videosList()
  }

}
