import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/modules/core/interfaces/user';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private userService : UserService) { }

  ngOnInit(): void {
  }

  signupForm = this.formBuilder.group({
    name : [ "", [Validators.minLength(4), Validators.required]],
    DO : [ "", [Validators.minLength(6), Validators.required]],
    last_name : [ "", [Validators.minLength(4), Validators.required]],
    pass : [ "", [Validators.minLength(8), Validators.required]],
    repPass : [ "", [Validators.minLength(8), Validators.required]],
    contact : [ "", [Validators.minLength(8), Validators.required]]
  })

  isFormInvalid() {
    //check if passwd are the same
    const pass = this.signupForm.controls.pass.value;
    const repPass = this.signupForm.controls.repPass.value;
    if (pass !== repPass) {
      return false;
    }
    return this.signupForm.invalid;
  }

  registerUser() {
    
    if (!this.isFormInvalid()){
      const DO = this.signupForm.controls.DO.value;

      if (!this.userService.checkIdIsValid(DO)) { 
          //do is invalid
      }

      /*const userData : User = {
        DO : DO,
        password : this.signupForm.controls.pass.value,
        name : this.signupForm.controls.name.value,
        last_name: this.signupForm.controls.last_name.value,
        contact : this.signupForm.controls.contact.value
      }

      this.userService.registerUser(userData)*/
    }
  }

}
