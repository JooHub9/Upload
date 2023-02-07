import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  nametext: string = "macaco";
  messagetext: string = "";
  commenttext: string = "Comment";
  errorMessagetext: string = "";
  errorEmailtext: string = "";

  errorMessage: string = "";
  warning: boolean = false;
  listTerms: Terms[] = [];
  objTerms = {} as Terms;

  commentForm: FormGroup;

  body: {} = {};

  @Input() id: string = "";
  @Input() page: string = "";

  constructor(private appService: AppService, private formBuilder: FormBuilder) {

    this.commentForm = this.formBuilder.group({
      name: [''],
      email: [''],
      comment: [''],
    });
  }

  ngOnInit(): void {


    this.appService.getTerms().subscribe(tm => {
      this.listTerms = tm;

      this.listTerms.forEach(t => {

        switch (Number(t.tid)) {
          case 83: {
            this.nametext = t.name
            break;
          }
          case 85: {
            this.messagetext = t.name
            break;
          }
          case 79: {
            this.commenttext = t.name
            break;
          }
          case 89: {
            this.errorMessagetext = t.name
            break;
          }
          case 93: {
            this.errorEmailtext = t.name
            break;
          }

        }
      })
    });
  }


  get email() {
    return this.commentForm.get('email');
  }

  get name() {
    return this.commentForm.get('name');
  }

  get comment() {
    return this.commentForm.get('comment');
  }

  onSubmit(): void {

    if (this.commentForm.invalid) {

      if (this.commentForm.value.email.includes("@")) {
        this.warning = true;
        this.errorMessage = this.errorMessagetext;

        setTimeout(() => {
          this.warning = false;
          this.errorMessage = ""
        }, 2000);
      }

      else {
        this.warning = true;
        this.errorMessage = this.errorEmailtext

        setTimeout(() => {
          this.errorMessage = ""
          this.warning = false;
        }, 2000);
      }

    } else {

      if (this.page === "channel") {
        this.body =
          {
            "entity_id": [{"target_id": this.id}],
            "entity_type": [{"value": "node"}],
            "comment_type": [{"target_id": "comment"}],
            "field_name": [{"value": "field_comment_channel"}],
            "field_username": [{"value": this.commentForm.value.name}],
            "field_email": [{"value": this.commentForm.value.email}],
            "field_comment": [{"value": this.commentForm.value.comment}]
          }

        this.appService.postComment(this.body).subscribe(() => {
          this.appService.notifyChannels({refreshChannel: true});
        })

      } else {
        this.body =
          {
            "entity_id": [{"target_id": this.id}],
            "entity_type": [{"value": "media"}],
            "comment_type": [{"target_id": "video_comment"}],
            "field_name": [{"value": "field_video_comment"}],
            "field_username_video": [{"value": this.commentForm.value.name}],
            "field_comment_email": [{"value": this.commentForm.value.email}],
            "comment_body": [{"value": this.commentForm.value.comment}]
          }
        this.appService.postComment(this.body).subscribe(() => {
          this.appService.notifyVideos({refreshVideo: true});
        })
      }
      this.commentForm.reset();
    }
  }
}
