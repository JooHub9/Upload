import {Component, Input} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";
import {faFacebook, faTwitter, faLinkedin} from "@fortawesome/free-brands-svg-icons"
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import {Clipboard} from "@angular/cdk/clipboard"
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-share-pop-up',
  templateUrl: './share-pop-up.component.html',
  styleUrls: ['./share-pop-up.component.scss']
})
export class SharePopUpComponent {

  @Input() isShare!: boolean;
  @Input() field_media_oembed_video!: string;
  urlvtitle!: string
  video = {} as Video
  @Input()mid!:string

  url: string = "https://project-upskill2-grupo3.netlify.app/video/"

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faXmark = faXmark;
  listTerms: Terms[] = [];
  share_text: string = "";
  copy_text: string = "";
  link_copied_text: string = "";



  constructor(public appService: AppService, public route: ActivatedRoute, public clipboard: Clipboard, private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
   this.appService.getVideo(this.mid).subscribe(v => {
     this.video = v[0]
      this.urlvtitle= this.video.view_media.split('video/')[1]
    })

    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {

        switch (Number(t.tid)) {
          case 95: {
            this.share_text = t.name
            break;
          }
          case 96: {
            this.copy_text = t.name
            break;
          }
          case 97: {
            this.link_copied_text = t.name
            break;
          }
        }
      })
    });
  }


  onCopy(value: string) {
    this.clipboard.copy(value);
    this.sucessShare()
  }

  sucessShare() {
    this.toastr.success(this.link_copied_text, '')
  }
}
