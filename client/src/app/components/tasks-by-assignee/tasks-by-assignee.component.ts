import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-tasks-by-assignee',
  templateUrl: './tasks-by-assignee.component.html',
  styleUrls: ['./tasks-by-assignee.component.less']
})
export class TasksByAssigneeComponent implements OnInit {
  userId: string | null
  tasks: any[] = []
  headers = {}
  pagination = {
    "totalRecords": 0,
    "limit": 10
  }
  tempId = ""
  loading = false;
  processTask = {}
  page = 1;
  limit = 10;
  overlay=false
  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) public document: Document) {
    this.userId = null
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId != null) {
      this.getTasksByMe(this.userId).subscribe((data) => {
        this.loading = false
        this.tasks = data.results;
        this.pagination = data.pagination;
      })
    }
  }

  ngOnInit(): void {
    this.loading = true;

    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId != null) {
      this.getTasksByMe(this.userId).subscribe((data) => {
        this.loading = false
        this.tasks = data.results;
        this.pagination = data.pagination;
      })

    }
  }

  toggle(value){
    this.overlay=value
  }

  getTasksByMe(userId: string): Observable<any> {
    var offset = (this.page - 1) * this.limit;
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    return this.http.get(environment.baseUrl + '/tasks/assignee/' + this.userId + `?limit=${this.limit}&offset=${offset}`, { 'headers': this.headers });
  }

  setTempId(id: string) {
    this.tempId = id;
    this.processTask = { "taskId": this.tempId }
  }
  onChange(event: any) {
    this.processTask = { "taskId": this.tempId, "message": event.target.value }
  }

  takeAction(action: string, event: any) {
    event.preventDefault();
    this.processTask = { ... this.processTask, "action": action }
    this.processTaskFunction().subscribe((data) => {
      const item = this.tasks.find(item => item.id === this.tempId);
      console.log(action);
      if(action != 'review')
        this.tasks.splice(this.tasks.indexOf(item), 1);
    });

  }

  processTaskFunction(): Observable<any> {
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    return this.http.post(environment.baseUrl + '/process-task', this.processTask, { 'headers': this.headers });
  }

  changePage(event: any) {
    this.page = parseInt(event.target.getAttribute('page'));
    if (this.userId != null) {
      this.getTasksByMe(this.userId).subscribe((data) => {
        this.loading = false
        this.tasks = data.results;
        this.pagination = data.pagination;
      })
    }
  }
  limitChange(event: any) {
    this.limit = parseInt(event.target.value);
    this.page = 1;
    if (this.userId != null) {
      this.getTasksByMe(this.userId).subscribe((data) => {
        this.loading = false
        this.tasks = data.results;
        this.pagination = data.pagination;
      })
    }
  }

}
