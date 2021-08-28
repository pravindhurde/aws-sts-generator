import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.less']
})
export class CallbackComponent implements OnInit {
  headers = {}
  processId;
  process;
  loading=false
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  getProcessByPid() {
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    this.http.get(environment.baseUrl + "/process/callback/" + this.processId, { headers: this.headers }).subscribe(res => {
      this.process = res;
      this.loading = false
    }, (err) => {
      this.loading = false
    });
  }

  onSubmit(event: any, pid) {
    this.loading = true
    event.preventDefault();
    this.processId = pid;
    this.getProcessByPid();
  }

}
