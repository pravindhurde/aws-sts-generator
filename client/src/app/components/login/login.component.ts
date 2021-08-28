import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor() { }
  @Output() loginEvent = new EventEmitter<string>();

  ngOnInit(): void {
  }

  login(value: string) {
    this.loginEvent.emit(value);
  }

  onSubmit(userId: string): void {
    console.log(userId)
    this.login(userId)
  }
}
