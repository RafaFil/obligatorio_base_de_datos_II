import { Component, OnInit, ViewChild } from '@angular/core';
import { HelpAplicationFormComponent } from '../help-aplication-form/help-aplication-form.component';
import { HelpAplication } from 'src/app/modules/core/interfaces/helpAplication';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-help-aplication',
  templateUrl: './dialog-help-aplication.component.html',
  styleUrls: ['./dialog-help-aplication.component.scss']
})
export class DialogHelpAplicationComponent implements OnInit {

  @ViewChild('helpAppForm') helpAplicationForm!: HelpAplicationFormComponent;

  constructor(private dialog : MatDialogRef<HelpAplicationFormComponent>) { }

  ngOnInit(): void {
  }

  pullDataAplicationForm() {
    
    const title = this.helpAplicationForm.helpAplicationForm.controls.title.value;
    const description = this.helpAplicationForm.helpAplicationForm.controls.description.value;
    const ability = this.helpAplicationForm.helpAplicationForm.controls.ability.value;
    const level = this.helpAplicationForm.helpAplicationForm.controls.level.value;
    const street = this.helpAplicationForm.helpAplicationForm.controls.street.value;
    const corner = this.helpAplicationForm.helpAplicationForm.controls.corner.value;

    if (!title || !description) {

      alert("faltan campos obligatorios")
    }

    else {

      const helpAplication : HelpAplication = {
        title : title,
        description : description,
        userDO : "a" //Sacarlo del local storage
      };
      
      this.dialog.close(helpAplication);
    }
  }

}
