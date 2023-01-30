import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {AppService} from "../../app.service";
import {faEllipsisVertical, faFlag} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {createPopper} from "@popperjs/core";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})


export class CommentComponent {

  faEllipsisVertical = faEllipsisVertical;
  faFlag = faFlag;

  thankstext: string = "";
  pleasetext: string = "";
  otherreasontext: string = "";
  reporttext: string = "";
  sendtext: string = "";

  listTerms: Terms[] = [];


  selected: boolean = false;
  warning: boolean = false;
  optionsInvisible: boolean = true;
  reportThanks: boolean = false;

  selectedReason: any  = null;


  reason: string = "";

  visible: boolean = false;
  active: boolean = false;
  reported: boolean = false;
  reasonsArray: {} [] = [];
  countNum: number = 0;
  reasonsList: Reason [] = [];
  reasonsForm: FormGroup;


  constructor(public appService: AppService, private formBuilder: FormBuilder, private rd: Renderer2) {
    this.reasonsForm = this.formBuilder.group({
      userReason: "",
      reasondefault: new FormControl('')
    })
  }

  @Input() uid: string = "";
  @Input() user_picture: string = "";
  @Input() username: string = "";
  @Input() date: string = "";
  @Input() comment: string = "";
  @Input() email: string = "";
  @Input() idComment: string = "";
  @Input() channel!: boolean;
  @Input() reasons!: string;
  @Input() count!: string;
  @Input() idreason!: number;


  ngOnInit() {
    this.appService.getReasons().subscribe(rsl => {
      this.reasonsList = rsl;
    });

    this.reasonsArray = this.reasons.split(",")
      .map(r => {
        return {"value": r}
      })


    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {

        switch (Number(t.tid)) {
          case 86: {
            this.thankstext = t.name
            break;
          }
          case 87: {
            this.pleasetext = t.name
            break;
          }
          case 81: {
            this.otherreasontext = t.name
            break;
          }
          case 80: {
            this.reporttext = t.name
            break;
          }
          case 91: {
            this.sendtext = t.name
            break;
          }

        }
      })
    });

    /*this.reasonsForm.get('reasondefault')!.valueChanges.subscribe(selectedReason => {
      if (selectedReason) {
        this.reasonsList.forEach(r => {
          if (r.name !== selectedReason) {
            selectedReason.c = true;
          }
        });
      }
    });*/
  }  //end of ngOnInit

/*___________ Popper _______________*/




  /*---- get info from Form ---- */



  setReasonDefault(a: any) {
    this.reason = a
  }

  get userReason() {
    return this.reasonsForm.get('userReason');
  }

  getusertreason() {
    return this.reasonsForm.value.userReason;
  }


  getReason() {
    if (this.selected) {
      this.report();
      this.selected = false;
      this.reason = "";
    } else {

      if (this.getusertreason() === "") {
        this.warning = true;
        this.reason = "";
        setTimeout(() => {
          this.warning = false;
        }, 1000);
        console.log("aconteceu aqui: ", this.reason, this.selected);
      } else {
        this.reason = this.getusertreason();
        console.log("a razao2: ", this.reason);
        this.report();
        this.selected = false;
        this.reason = "";
        this.reasonsForm.value.userReason = "";
      }
    }
  }


  //_______________________________//

  setWarningFalse() {
    this.warning = false;
  }


  toggleReportText() {
    this.visible = !this.visible;
  }

  toggleShowOptions() {
    this.optionsInvisible = !this.optionsInvisible;
  }

  toggleReportThanks() {
    this.reportThanks = !this.reportThanks;
  }

  report() {

    this.countNum = Number(this.count) + 1;
    this.reasonsArray.push({"value": this.reason});
    this.appService.Report(this.idComment, this.channel, this.reasonsArray, this.countNum)

    /*setTimeout(() => {
      this.channel ?
        this.appService.notifyChannels({refreshChannel: true}) : this.appService.notifyVideos({refreshVideo: true});
    }, 1000);*/

    this.toggleReportThanks();
  }


  onChange(value:any)
  {
    this.selected=true;
    this.selectedReason = value;
  }

}
