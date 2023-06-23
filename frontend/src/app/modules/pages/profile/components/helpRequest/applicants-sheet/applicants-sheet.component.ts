import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';

@Component({
  selector: 'app-applicants-sheet',
  templateUrl: './applicants-sheet.component.html',
  styleUrls: ['./applicants-sheet.component.scss']
})
export class ApplicantsSheetComponent implements OnInit {

  isLoading = true;
  AplicantsArr: String[] = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public DataReq : {title : string, id : number},
    private postulationService : PostulationService
  ) { }

  ngOnInit(): void {
    this.postulationService.getAllAplicantsToARequest(this.DataReq.id).subscribe({
      next: (res) => {

        if (res.success && res.data) {
          
          res.data.forEach( h => {

            this.AplicantsArr.push(
              `${h.username} ${h.userlastname} | Verificado: 
              ${h.verified ? 'Si' : 'No'}`)
          });

          this.isLoading = false;
        }
        else {

          this.isLoading = false;
        }

        
      },
      error: (err) => {

        this.isLoading = false;
      }
    })
  }

}
