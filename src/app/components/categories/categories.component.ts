import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "src/app/upload.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(public route: ActivatedRoute, public UploadService: UploadService) { }

  categories! : any;

  ngOnInit(): void {

    this.UploadService.getCategories().subscribe((categories : any) => {
      this.categories = categories;
    })
  }
}
