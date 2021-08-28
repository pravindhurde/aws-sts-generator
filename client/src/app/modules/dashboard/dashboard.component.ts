import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  @Input() userId:string | undefined
  constructor(private router: Router, private route: ActivatedRoute) { 
  }
  @Output() logoutEvent = new EventEmitter<string>();
  ngOnInit(): void {
    var element = document.getElementsByClassName('zs-icon-arrow-first')[0]
    if(element) element.innerHTML="&#171;"
  }

  logout() {
    this.logoutEvent.emit();
  }

}
