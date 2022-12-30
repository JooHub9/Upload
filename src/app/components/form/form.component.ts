import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  constructor(private appService: AppService,private formBuilder: FormBuilder) { }

  commentForm = this.formBuilder.group({
    name: '',
    email: '',
    comment:""
  });

  onSubmit(): void {
   /* this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();*/
  }



}
