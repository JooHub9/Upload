import {Component, Input, Renderer2} from '@angular/core';
import {AppService} from "../../app.service";
import {faEllipsisVertical, faFlag} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  faEllipsisVertical = faEllipsisVertical;
  faFlag = faFlag;

  thankstext:string = "Thank you for reporting";
  pleasetext:string = "Please choose a reason";
  otherreasontext:string = "";
  reporttext:string = "";
  listTerms: Terms[] = [];


  selected: boolean = false;
  warning: boolean = false;
  optionsInvisible: boolean = true;
  reportThanks: boolean = false;

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
      reasondefault: ""
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

        this.listTerms.forEach(t=>{

          switch(Number(t.tid)) {
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

          }})});

  }


  get userReason() {
    return this.reasonsForm.get('userReason');
  }

  getusertreason() {
    return this.reasonsForm.value.userReason;
  }

  setdefaultreason(f: string) {
    this.reason = f;

  }

  setWarningFalse()
  {
    this.warning=false;
  }

  getReason() {
      if (this.selected) {
        this.report();
        console.log("a razao1: ", this.reason);
        this.selected = false;
        this.reason ="";
      }
      else {

        if ( this.getusertreason()=== "") {
          this.warning = true;
          this.reason ="";
          setTimeout(() => {
            this.warning=false;
          }, 1000);
          console.log("aconteceu aqui: ", this.reason, this.selected);
        }
        else
        {
        this.reason= this.getusertreason();
        console.log("a razao2: ", this.reason);
          this.report();
        this.selected = false;
        this.reason ="";
        this.reasonsForm.value.userReason="";
        }
      }
    }



  //_______________________________//

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


    console.log("o count: ", this.countNum)


console.log("o ARRAY1: ", this.reasonsArray)


    this.reasonsArray.push({"value":this.reason});
    console.log("o ARRAY2: ", this.reasonsArray)

    this.appService.Report(this.idComment, this.channel,this.reasonsArray,this.countNum)
    console.log("o channel: ", this.channel)

    setTimeout(()=>{
      this.channel?
        this.appService.notifyChannels({refreshChannel: true}):this.appService.notifyVideos({refreshVideo: true});
    }, 1000);

    this.toggleReportThanks();

  }


}
