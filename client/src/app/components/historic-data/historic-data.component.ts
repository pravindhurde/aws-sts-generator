import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-historic-data',
  templateUrl: './historic-data.component.html',
  styleUrls: ['./historic-data.component.less']
})
export class HistoricDataComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  baseUrl = environment.baseUrl;
  headers;
  getVar1;
  getVar2;
  getVar3;
  userId;
  pid;
  tid;
  process;
  tasks: any = [];
  task;
  loading;
  empty;
  limit = 10;
  tempMap = {}
  page = 1;
  pagination;
  showPag = false;
  emptyPid;
  emptyTid;

  overlay =false;
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
  }
  toggle(value){
    this.overlay=value
  }
  getVar1Change(value: any) {
    this.tasks = [];
    this.process = null;
    this.task = null;
    this.getVar2 = null;
    this.getVar3 = null;
    this.getVar1 = value['getVar1'];
    this.showPag = false;
    this.emptyPid = false;
    this.emptyTid = false;
  }

  getVar2Change(value: any) {
    this.tasks = [];
    this.process = null;
    this.task = null;
    this.getVar3 = null;
    this.getVar2 = value['getVar2'];
    if (this.getVar2 == 'assignee')
      this.getResults();
    this.showPag = false;
    this.emptyPid = false;
    this.emptyTid = false;
  }

  getVar3Change(value: any) {
    this.tasks = [];
    this.process = null;
    this.task = null;
    this.getVar2 = null;
    this.getVar3 = value['getVar3'];
    this.showPag = false;
    this.emptyPid = false;
    this.emptyTid = false;
  }

  getResults() {
    this.tasks = [];
    this.process = null;
    this.task = null;
    this.loading = true;
    var offset = (this.page - 1) * this.limit;
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }

    if (this.getVar1 == 'task' && this.getVar2 == 'assignee') {
      this.http.get<any>(this.baseUrl + "/historic-tasks/assignee/" + this.userId + "?limit=" + this.limit + "&offset=" + offset, { headers: this.headers }).subscribe((res) => {
        this.tasks = res.results;
        this.pagination = res.pagination;
        this.loading = false;
        if (this.tasks.length == 0) {
          this.empty = true;
        }
        else {
          this.showPag = true;
          this.empty = false;
        }
      });
    }
    else if (this.getVar1 == 'task' && this.getVar2 == 'pid') {
      this.http.get<any>(this.baseUrl + "/historic-tasks/" + this.pid + "?limit=" + this.limit + "&offset=" + offset, { headers: this.headers }).subscribe(res => {
        this.tasks = res.results;
        this.pagination = res.pagination;
        this.loading = false;
        if (this.tasks.length == 0) {
          this.empty = true;
        }
        else {
          this.empty = false;
          this.showPag = true;
        }
      });
    }
    else if (this.getVar1 == 'task' && this.getVar2 == 'tid') {
      this.http.get<any>(this.baseUrl + "/historic-task/" + this.tid, { headers: this.headers }).subscribe(res => {
        this.task = res;
        this.loading = false;
        this.empty = false;
      },
        (error) => {
          this.loading = false;
          this.empty = true;
        });
    }
    else if (this.getVar1 == 'process' && this.getVar3 == 'pid') {
      this.http.get<any>(this.baseUrl + "/historic-process/" + this.pid, { headers: this.headers }).subscribe(res => {
        this.process = res;
        this.loading = false;
        this.empty = false;
      },
        (error) => {
          this.loading = false;
          this.empty = true;
        });
    }
  }

  onSubmitPid(value) {
    this.emptyTid = false;
    if(value==null || value=='')  {
      this.emptyPid = true;
      return
    }
    this.emptyPid = false;
    this.pid = value;
    this.getResults();
  }

  onSubmitTid(value) {
    this.emptyPid = false;
    if(value==null || value=='')  {
      this.emptyTid = true;
      return
    }
    this.emptyTid = false;
    this.tid = value;
    this.getResults();
  }

  setTempMap(map: any) {
    this.tempMap = map;
  }

  changePage(event: any) {
    this.page = parseInt(event.target.getAttribute('page'));
    this.getResults();
  }

  limitChange(event: any) {
    this.limit = parseInt(event.target.value);
    this.page = 1;
    this.getResults();
  }
}
