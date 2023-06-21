import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
              private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.userService.validateToken()
      .pipe(
        tap( valid => {
          console.log("valid", valid)
          if ( !valid ) {
            this.router.navigateByUrl('/');
          }
        })
      );
  }

  canLoad(): Observable<boolean> {
    return this.canActivate();
  }

}