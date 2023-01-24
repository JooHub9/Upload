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
    this.language === "en" ? this.otherlanguage = "Alterar para Português" : this.otherlanguage = "Change to English"
  }

  changeLanguage() {
    this.language = this.appService.getLanguage();
    this.language === "en" ? this.language = "pt" : this.language = "en"


    this.appService.modifyLanguage(this.language)
    console.log("a lingua agora - ", this.language)


    // ----  refresh language
    setTimeout(()=>{
      this.appService.notifylangUpdate({langUpdate: true});
    }, 300);

    setTimeout(()=>{
      window.location.reload()
    }, 600);
  }

}
