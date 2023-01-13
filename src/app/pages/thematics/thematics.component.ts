import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "src/app/app.service";

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit{
  thematics? : any;

  constructor(public route: ActivatedRoute, public AppService: AppService) {
    /*this.tid = route.snapshot.params["tid"];*/
  }

  ngOnInit(): void {

    this.AppService.getThematics().subscribe((thematics : any) => {
      this.thematics = thematics;
    });
  }
}

