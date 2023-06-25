import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatChip } from '@angular/material/chips';


@Component({
  selector: 'app-search-request-filters',
  templateUrl: './search-request-filters.component.html',
  styleUrls: ['./search-request-filters.component.scss']
})
export class SearchRequestFiltersComponent implements OnInit {

  filters = ["Mis habilidades", "Mis amigos"]

  @Output() chipSelected : EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }

  filterForm = this.formBuilder.group({
    filters : [""]
  });

  onSelectChip(c : MatChip) {

    c.select()
    this.chipSelected.emit();
  }

}
