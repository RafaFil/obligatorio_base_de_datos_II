import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/modules/core/interfaces/userAuth';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  usuarioDO!: string | null;

  constructor(private formBuilder : FormBuilder, private userService : UserService,
              private router : Router) { }

  ngOnInit(): void {
  }

  loginForm = this.formBuilder.group({
    DO : [ "", [Validators.minLength(4), Validators.required]],
    password : [ "", [Validators.minLength(4), Validators.required]]
  })

  getUser() {
    const DO = this.loginForm.controls.DO.value;
    const password = this.loginForm.controls.password.value;
    
    if (DO && password) {
      
      const credentials : UserAuth = {
        DO : DO,
        password : password,
      }

      this.userService.getUserByCredentials(credentials)
      .subscribe( result => {

        console.log(result);
        //this.usuarioDO = localStorage.getItem("token")

        if (!result.success) {

            alert("ha ocurrido un error");
        }

        else {

          this.router.navigate(["/home"]);
        }
      });
      
    }

  }



}
