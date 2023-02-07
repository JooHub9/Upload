import {Component} from '@angular/core';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {AppService} from "../../app.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {

  faGlobe = faGlobe;

  otherlanguage: string = "";
  language: string = "";

  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.language = this.appService.getLanguage();
    this.language === "en" ? this.otherlanguage = "EN | Alterar para Português" : this.otherlanguage = "PT | Change to English"
  }

  changeLanguage() {
    this.language = this.appService.getLanguage();
    this.language === "en" ? this.language = "pt" : this.language = "en"

    this.appService.modifyLanguage(this.language)

    this.appService.notifylangUpdate({langUpdate: true});

    this.router.navigate(['/homepage']).then(()=> window.location.reload())

  }

}
