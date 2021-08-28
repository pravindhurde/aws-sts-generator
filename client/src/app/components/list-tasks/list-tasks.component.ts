import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.less']
})
export class ListTasksComponent implements OnInit {
  loading = false
  constructor(private http: HttpClient) {
    this.loading = true;
    this.getAllTasks()
  }

  baseUrl = environment.baseUrl;
  tasks: any[] = [];
  headers;
  page = 1;
  limit = 10
  pagination = {
    "totalRecords": 0,
    "limit": 10
  }

  ngOnInit() {
    this.getAllTasks()
  }

  getListOfTasks(): Observable<any> {
    var offset = (this.page - 1) * this.limit;
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    return this.http.get(this.baseUrl + `/tasks?limit=${this.limit}&offset=${offset}`, { headers: this.headers })
  }

  getAllTasks() {
    this.getListOfTasks().subscribe(res => {
      this.tasks = res.results;
      this.pagination = res.pagination;
      this.loading = false;
    });;
  }
  changePage(event: any) {
    this.page = parseInt(event.target.getAttribute('page'));
    this.getListOfTasks().subscribe((data) => {
      this.tasks = data.results;
      this.pagination = data.pagination;
      this.loading = false;
    })
  }

  limitChange(event: any) {
    this.limit = parseInt(event.target.value);
    this.page = 1;
    this.getListOfTasks().subscribe((data) => {
      this.tasks = data.results;
      this.pagination = data.pagination;
      this.loading = false;
    })
  }
}
