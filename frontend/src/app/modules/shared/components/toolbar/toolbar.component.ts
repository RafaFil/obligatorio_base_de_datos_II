import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private userService : UserService,
              private router : Router) { }

  ngOnInit(): void {
  }

  goToUserProfile() {
    
  }

  logout() {

    this.userService.logout();
    this.router.navigate(["/"]);
  }

}
