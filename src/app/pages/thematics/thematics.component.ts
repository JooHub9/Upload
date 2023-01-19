import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "src/app/app.service";

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit{
  thematics : Thematic[] = [];

  constructor(public route: ActivatedRoute, public AppService: AppService) {
  }

  ngOnInit(): void {

    this.AppService.getThematics().subscribe((thematics ) => {
      this.thematics = thematics;
    });
  }
}

