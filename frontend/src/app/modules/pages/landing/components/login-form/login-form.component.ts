import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  isLoading = false;
  isPassVisible = false;
  inputPasswordType = "password";
  passwordVisibilityIcon = "visibility";

  constructor(private formBuilder : FormBuilder, private userService : UserService,
              private router : Router, private snackBar : MatSnackBar) { }

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

    this.isLoading = true;
    this.userService.getUserByCredentials(credentials)
    .subscribe( result => {
      if (!result.success) {
          this.isLoading = false;
          this.snackBar.open("Inicio de sesión fallido. Revise su documento o contraseña", undefined, {
            duration: 3000
          })
      }

      else {

        this.router.navigate(["/home"]);
      }
    });
      
    }

  }

  changePassVisibility() {

    if (this.isPassVisible) {
      this.inputPasswordType = "text";
      this.passwordVisibilityIcon = "visibility_off"
      this.isPassVisible = false;
    }

    else {
      this.passwordVisibilityIcon = "visibility";
      this.inputPasswordType = "password";
      this.isPassVisible = true;
    }

  }



}
