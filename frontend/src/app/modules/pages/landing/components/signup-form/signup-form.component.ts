import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/core/interfaces/user';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {


  constructor(private formBuilder : FormBuilder, private userService : UserService,
              private router : Router) { }

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



  arePassThesame(pass: string | null, repPass : string | null) {
    
    if (pass !== repPass) {
      return false;
    }

    return true;
  }

  registerUser() {
    
    const DO = this.signupForm.controls.DO.value;

    if (!this.userService.checkIdIsValid(DO)) { 
        alert("Ci invalida");
        return;
    }

    const password = this.signupForm.controls.pass.value;
    const name = this.signupForm.controls.name.value;
    const last_name = this.signupForm.controls.last_name.value;
    const contact = this.signupForm.controls.contact.value;
    const repPass = this.signupForm.controls.repPass.value;

    if (this.arePassThesame(password, repPass) && password && name && last_name && contact && DO) {
      const userData : User = {
        DO : DO,
        password : password,
        name : name,
        last_name: last_name,
      }
      this.userService.registerUser(userData)
      .subscribe( res => {
        if (res.success) {
          
          this.router.navigate(["/login"]);
        }
        
      })
    }

  }
}

