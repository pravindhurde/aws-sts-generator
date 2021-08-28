import { Component } from '@angular/core';
import Field from '../../node_modules/zsui/src/field/field.m.js';
import Select from '../../node_modules/zsui/src/select/select.m.js';
import Pagination from '../../node_modules/zsui/src/pagination/pagination.m.js';
import Card from '../../node_modules/zsui/src/card/card.m.js';
import { Router } from '@angular/router';
import Dialog from "../../node_modules/zsui/src/dialog/dialog.m.js";

Card.register();
Pagination.register('zs-pagination');
Field["register"]();
Select.register('zs-select', 'p');
Dialog.register();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  constructor(private route: Router){

  }
  userId = "";
  login(userId : string){
    this.userId = userId;
    this.route.navigate([`start-process/${userId}`]);
  }
  logout(value : string){
    this.userId = '';
    window.location.href = 'http://localhost:4200'
  }
}


