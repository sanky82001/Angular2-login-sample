import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { routing }  from './app.routing';
import { AdminComponent }  from './app.admin';
import { UserComponent }  from './app.user';

import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [ BrowserModule, FormsModule, routing, ChartsModule],
  declarations: [ AppComponent, AdminComponent, UserComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
