import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  options: any;
  constructor(private e: ElementRef) { }

  ngOnInit() {
    this.options = {
      arrow: true,
      name: 'tippy',
      interactive: true,
      html:'#my-tooltip-template',
      createPopperInstanceOnInit: true,
      placement: 'right',
      popperOptions: {
        modifiers: {
          preventOverflow: { enabled: false }
        }
    }
    };
  }

}
