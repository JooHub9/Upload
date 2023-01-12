import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  commentForm: FormGroup;
  userEmail?: FormData;

  constructor(private appService: AppService,private formBuilder: FormBuilder) {

  this.commentForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    comment:['', [Validators.required, Validators.minLength(15)]],
  });

  }

/*
  get email() {
    return this.commentForm.get('email');
  }
*/

  //this.userEmail = this.commentForm.get('email');



    onSubmit(): void {
    console.log(this.commentForm.value)
    this.commentForm.reset();
  }



}
