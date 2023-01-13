import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

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

      this.appService.postComment(this.body).subscribe()

      setTimeout(()=>{
        this.appService.notifyChannels({refreshChannel: true});
      }, 200);


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
      this.appService.postComment(this.body).subscribe()

      setTimeout(()=>{
        this.appService.notifyVideos({refreshVideo: true});
      }, 200);
    }

    this.commentForm.reset();

  }


}
