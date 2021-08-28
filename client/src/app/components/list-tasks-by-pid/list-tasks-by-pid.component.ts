import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-list-tasks-by-pid',
  templateUrl: './list-tasks-by-pid.component.html',
  styleUrls: ['./list-tasks-by-pid.component.less']
})
export class ListTasksByPidComponent implements OnInit {
  
  constructor(private http: HttpClient) { }

  loading;
  baseUrl = environment.baseUrl;
  tasks: any[] = [];
  headers;
  processId;
  pagination;
  limit = 10;
  page = 1;
  pidEmpty=false;

  ngOnInit(): void {

  }

  getListOfTasksByPid(): Observable<any> {
    var offset = (this.page - 1) * this.limit;
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    return this.http.get(this.baseUrl + "/tasks/" + this.processId+ '?' + `limit=${this.limit}&offset=${offset}`, { headers: this.headers })
  }

  onSubmit(event: any, pid) {
    //this.tasks = [''];
    if(pid==null || pid=='')
    {
      this.pidEmpty = true;
      return;
    }
    this.pidEmpty = false;
    this.loading = true
    event.preventDefault();
    this.processId = pid;
    this.getListOfTasksByPid().subscribe(res => {
      this.tasks = res.results;
      this.pagination = res.pagination;
      this.loading = false
    }, (err) => {
      this.loading = false
    });;
  }

  changePage(event: any) {
    this.page = parseInt(event.target.getAttribute('page'));
    this.getListOfTasksByPid().subscribe((data) => {
      this.tasks = data.results;
      this.pagination = data.pagination;
      this.loading = false;
    })
  }

  limitChange(event: any) {
    this.limit = parseInt(event.target.value);
    this.page = 1;
    this.getListOfTasksByPid().subscribe((data) => {
      this.tasks = data.results;
      this.pagination = data.pagination;
      this.loading = false;
    })
  }

}
