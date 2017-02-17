import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { routing }  from './app.routing';
import { AdminComponent }  from './app.admin';
import { UserComponent }  from './app.user';

@NgModule({
  imports: [ BrowserModule, FormsModule, routing ],
  declarations: [ AppComponent, AdminComponent, UserComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
