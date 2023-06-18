import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-search-request-filters',
  templateUrl: './search-request-filters.component.html',
  styleUrls: ['./search-request-filters.component.scss']
})
export class SearchRequestFiltersComponent implements OnInit {

  @Output() chipSelected : EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectChip() {
    this.chipSelected.emit();
  }

}
