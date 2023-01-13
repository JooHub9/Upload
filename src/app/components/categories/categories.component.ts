import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "src/app/app.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(public route: ActivatedRoute, public AppService: AppService) { }

  categories! : any;

  ngOnInit(): void {

    this.AppService.getCategories().subscribe((categories : any) => {
      this.categories = categories;
    })
  }
}
