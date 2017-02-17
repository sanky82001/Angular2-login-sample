// To both display a data property and update that property when the user makes changes, two-way data binding is used.
// [( )] = BANANA IN A BOX
import { Component } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  title: string = 'Welcome to world of freedom';
  loginId: string = '';
  pwd: string = '';

  constructor(private _router: Router) {};
  data: Object = {};
 
formSubmit(){
console.log(this.data);
  if(this.data.loginId == "admin" && this.data.pwd == "admin"){
    this._router.navigate(['admin']);
  }
  else{
    this._router.navigate(['user']);
  }

}

}
