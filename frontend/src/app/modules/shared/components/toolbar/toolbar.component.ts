import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSideNavEvent: EventEmitter<void> = new EventEmitter<void>();

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

  toogleSideNav() {

    this.toggleSideNavEvent.emit();
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
