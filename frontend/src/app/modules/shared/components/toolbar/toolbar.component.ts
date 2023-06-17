import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isOnProfile!: boolean;

  constructor(private userService : UserService,
              private router : Router) { 

                if (this.router.url == "/home") {
                  this.isOnProfile = false;
                }
                else {
                  this.isOnProfile = true
                }

  }

  ngOnInit(): void {
  }

  goToHomepage() {

    this.router.navigate(["/home"]);

  }

  goToUserProfile() {

    this.router.navigate(["/profile"]);
    
  }

  logout() {

    this.userService.logout();
    this.router.navigate(["/"]);

  }

}
