import { Component, OnInit, Input } from '@angular/core';
import { FilterPillConfig } from './pill-select.model';

@Component({
  selector: 'fleet-filter-pill',
  templateUrl: './pill-select.component.html',
  styleUrls: ['./pill-select.component.css']
})
export class PillSelectComponent implements OnInit {
  @Input()
  config: FilterPillConfig;
  constructor() { }

  ngOnInit() {
  }

}
