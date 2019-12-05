import { Component, OnInit, AfterViewInit } from '@angular/core';
import Popper from 'popper.js';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', () => {
      const e = document.getElementById('test');
      const target = document.getElementById('target');

      const example3popper1inst = new Popper(e, target, {
          placement: 'left'
      });
    });

  }
}
