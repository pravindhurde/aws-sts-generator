import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-all-process',
  templateUrl: './all-process.component.html',
  styleUrls: ['./all-process.component.less']
})
@Injectable({ providedIn: 'root' })
export class AllProcessComponent implements OnInit {
  processess: any[] = []
  loading = false;
  limit = 10;
  constructor(private http: HttpClient) {
    this.loading = true;

    this.getProcessess().subscribe((data) => {
      this.processess = data.results;
      this.pagination = data.pagination;
      this.loading = false;
    })
    

  }

  headers = {}
  overlay=false
  pagination = {
    "totalRecords": 0,
    "limit": 10
  }
  tempMap = {}
  page = 1;
  ngOnInit(): void {
    this.getProcessess().subscribe((data) => {
      this.processess = data.results;
      this.pagination = data.pagination;
      this.loading = false;
    })
  }
  toggle(value){
    this.overlay=value
  }
  getProcessess(): Observable<any> {
    var offset = (this.page - 1) * this.limit;
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    return this.http.get(environment.baseUrl + `/processes?limit=${this.limit}&offset=${offset}`, { 'headers': this.headers });
  }

  setTempMap(map: any) {
    this.tempMap = map;

  }
  changePage(event: any) {
    this.page = parseInt(event.target.getAttribute('page'));
    this.getProcessess().subscribe((data) => {
      this.processess = data.results;
      this.pagination = data.pagination;
      this.loading = false;
    })
  }

  limitChange(event: any) {
    this.limit = parseInt(event.target.value);
    this.page = 1;
    this.getProcessess().subscribe((data) => {
      this.processess = data.results;
      this.pagination = data.pagination;
      this.loading = false;
    })
  }
  isEmpty(obj: any) {
    return Object.keys(obj).length
  }

  dateConvert(timestamp){
      var d= new(timestamp);
      return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
  }

}
