import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-process-by-pid',
  templateUrl: './process-by-pid.component.html',
  styleUrls: ['./process-by-pid.component.less']
})
export class ProcessByPidComponent implements OnInit {
  loading;
  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;
  process;
  headers;
  processId;
  tempMap;
  pidEmpty=false;
  overlay=false

  ngOnInit(): void {

  }
  toggle(value){
    this.overlay=value
  }

  getProcessByPid() {
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    this.http.get(this.baseUrl + "/process/" + this.processId, { headers: this.headers }).subscribe(res => {
      this.process = res;
      this.loading = false
    }, (err) => {
      this.process = null;
      this.loading = false
    });
  }

  onSubmit(event: any, pid) {
    //this.process = null;
    if(pid==null || pid=='')
    {
      this.pidEmpty = true;
      return;
    }
    this.pidEmpty = false;
    this.loading = true
    event.preventDefault();
    this.processId = pid;
    this.getProcessByPid();
  }

  setTempMap(map: any) {
    this.tempMap = map;
  }

}
