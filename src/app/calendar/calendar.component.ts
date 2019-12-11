import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import dateformat from 'dateformat';

declare const Vue: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input()
  date: Date;

  @Input()
  from: any;

  @Input()
  to: any;

  @Output()
  dateChange: EventEmitter<Date>;

  constructor() {
    this.dateChange = new EventEmitter<Date>();
  }

  ngOnInit() {
    const $this = this;
    this.date = this.date || new Date();

    Vue.customElement('vue-calendar', {
      components: {  },
      props: [],
      template: `
      <div class="calendar">
        <div class="date">
          <a v-on:click="prevDay()"><i class="material-icons">keyboard_arrow_left</i></a>
          <v-date-picker v-on:input="onChange" :min-date="today" v-model="date" :popover="{ placement: 'bottom', visibility: 'click' }">
            <a>
              <i class="material-icons">date_range</i>&nbsp;&nbsp;
              <span v-if="isToday()">TODAY</span><span v-if="!isToday()">{{ getDisplayString() }}</span>
            </a>
          </v-date-picker>
          <a  v-on:click="nextDay()"><i class="material-icons">keyboard_arrow_right</i></a>
        </div>
      </div>
      `,
      data() {
        const today = new Date();
        return {
          date: $this.date,
          today: new Date(today.getFullYear(), today.getMonth(), today.getDate())
        };
      },
      methods: {
        isToday() {
          if (this.date) {
            return dateformat(this.today, 'yyyy/mm/dd') === dateformat(this.date, 'yyyy/mm/dd');
          }
          return false;
        },
        getDisplayString() {
          return dateformat(this.date, 'mmm dd, yyyy');
        },
        nextDay() {
          this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1);
        },
        prevDay() {
          if (!this.isToday()) {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1);
          }
        },
        onChange($event) {
          if (!$event) {
            $event = this.today;
            this.date = this.today;
          }
          $this.dateChange.next($event);
        }
      }
    });
  }

}
