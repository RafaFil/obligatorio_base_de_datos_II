import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataResponse } from 'src/app/modules/core/interfaces/apiDataResponse/userDataResponse';
import { FriendService } from 'src/app/modules/core/services/friend.service';
import { DialogAddFriendComponent } from '../../components/friendPage/dialog-add-friend/dialog-add-friend.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {

  friendsArr : UserDataResponse[] = [];

  frienDo!: string;

  constructor(private friendService : FriendService,
              private dialog : MatDialog,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {

    this.friendService.getAllUserFriend().subscribe({
      next: (res) => {

        if (res && res.success && res.data) {

          this.friendsArr = res.data;
        }
      }
    })

  }

  openFriendDialog(friendId : string) {

    const dialogRef = this.dialog.open(DialogAddFriendComponent, {
      data: friendId
    });

    dialogRef.afterClosed().subscribe({
      next: (res : boolean) => {

        if (res) {

          this.addFriend(friendId);
        }

      }
    })
  }

  addFriend(friendId : string) {

    this.friendService.AddAFriend(friendId).subscribe({
      next: (res) => {
        
        if (res && res.success) {

          this.snackBar.open("Amigo añadido", undefined, {
            duration: 3000
          })
        }
        if(res) {
          this.snackBar.open("No se pudo añadir al amigo", undefined, {
            duration: 3000
          })
        }
      }
    });
  }
}
