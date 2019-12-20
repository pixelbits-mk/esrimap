import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';



@NgModule({
   declarations: [
      CalendarComponent
   ],
   imports: [
       CommonModule,
       MaterialModule
   ],
   providers: [],
   schemas: [
       CUSTOM_ELEMENTS_SCHEMA
   ],
   exports: [
    CalendarComponent
   ]
 })
export class CalendarModule { }
