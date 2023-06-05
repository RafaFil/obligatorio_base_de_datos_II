import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuth } from 'src/app/modules/core/interfaces/userAuth';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private userService : UserService) { }

  ngOnInit(): void {
  }

  loginForm = this.formBuilder.group({
    DO : [ "", [Validators.minLength(4), Validators.required]],
    password : [ "", [Validators.minLength(4), Validators.required]]
  })

  getUser(credentials : UserAuth) {
    const DO = this.loginForm.controls.DO.value;
    const password = this.loginForm.controls.password.value;
    
    if (DO && password) {
      
      const credentials : UserAuth = {
        DO : DO,
        password : password,
      }

      this.userService.getUserByCredentials(credentials);
      
    }
  }


}
