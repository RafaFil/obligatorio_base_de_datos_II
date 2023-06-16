import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isOnProfile = false;

  constructor(private userService : UserService,
              private router : Router) { }

  ngOnInit(): void {
  }

  goToHomepage() {
    
    console.log(this.isOnProfile);
    this.isOnProfile = false;
    console.log(this.isOnProfile);
    this.router.navigate(["/home"]);
  }

  goToUserProfile() {

    console.log(this.isOnProfile);
    this.isOnProfile = true;
    console.log(this.isOnProfile);
    this.router.navigate(["/profile"]);
  }

  logout() {

    this.userService.logout();
    this.router.navigate(["/"]);
  }

}
