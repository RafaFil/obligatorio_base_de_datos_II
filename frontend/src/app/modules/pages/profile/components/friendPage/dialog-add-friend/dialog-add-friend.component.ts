import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/modules/core/services/user.service';
import { FriendsPageComponent } from '../../../pages/friends-page/friends-page.component';
import { UserDataResponse } from 'src/app/modules/core/interfaces/apiDataResponse/userDataResponse';

@Component({
  selector: 'app-dialog-add-friend',
  templateUrl: './dialog-add-friend.component.html',
  styleUrls: ['./dialog-add-friend.component.scss']
})
export class DialogAddFriendComponent implements OnInit {

  friendName !: string;
  isLoading = true;
  userFound = false;
  searchedUser? : UserDataResponse;

  constructor(@Inject(MAT_DIALOG_DATA) public friendId : string,
              private userService : UserService,
              private dialog : MatDialogRef<FriendsPageComponent>) { }

  ngOnInit(): void {
    this.userService.getUserByDO(this.friendId).subscribe({
      next: (res) => {

        if (res && res.success && res.data) {
          this.searchedUser = res.data
          this.friendName = `${res.data.name}  ${res.data.lastname} (Verificado: 
          ${res.data.verified ? 'SI' : 'NO'})`; 
          this.isLoading = false;
          this.userFound = true;
        }
        else {

          this.friendId = "Usuario No encontrado";
          this.isLoading = false;
        }
      }
    })
  }

  closeDialog() {

    this.dialog.close(this.searchedUser);
  }

}
