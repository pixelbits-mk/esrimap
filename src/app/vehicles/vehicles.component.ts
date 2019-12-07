import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  options: any;
  constructor(private e: ElementRef) { }

  ngOnInit() {
    this.options = {
      arrow: true,
      name: 'tippy',
      interactive: true,
      html: '#my-tooltip-template',
      createPopperInstanceOnInit: true,
      placement: 'left',
      popperOptions: {
        modifiers: {
          preventOverflow: { enabled: false }
        }
      }
    };
  }
}
