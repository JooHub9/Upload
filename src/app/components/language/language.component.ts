import {Component} from '@angular/core';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {AppService} from "../../app.service";


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {

  faGlobe = faGlobe;

  otherlanguage: string = "";
  language: string="";

  constructor(private appService: AppService){}

  ngOnInit() {
    this.language = this.appService.getLanguage();
   /* this.language === "en" ? this.otherlanguage = "en" : this.otherlanguage = "pt";*/
  }

  changeLanguage() {
    this.language === "en" ? this.language = "pt" : this.language = "en"

    this.appService.modifyLanguage(this.language)

    this.language = this.appService.getLanguage();
/*
    this.language === "en" ? this.otherlanguage = "en" : this.otherlanguage = "pt";*/


   /* setTimeout(()=>{
      window.location.reload(), 5000
    });*/


  }

}
