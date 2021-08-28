import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.less']
})
export class LogsComponent implements OnInit {
  filter = {}
  headers = {}
  constructor(private http: HttpClient) { }
  logs: any[] = []
  tempMap = []
  loading;
  overlay=false
  ngOnInit(): void {
  }
  toggle(value){
    this.overlay=value
  }
  addFilter(event: any) {
    var key = event.target.name;
    var value = event.target.value;
    this.filter = { ...this.filter, [key]: value }
  }

  fetchData(): Observable<any> {
    this.loading = true;
    var filterString = "?filter=";
    for (const [key, value] of Object.entries(this.filter)) {
      if (value != '') filterString += (key + ':' + value + '::');
    }
    filterString = filterString.slice(0, -2)
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    return this.http.get(environment.baseUrl + '/logs' + filterString, { 'headers': this.headers });
  }

  getData() {
    this.fetchData().subscribe((data) => {
      this.logs = data.results;
      this.loading = false;
    }, () => {
      this.loading = false
    })
  }

  setTempMap(map: any) {
    this.tempMap = map;
  }
}
