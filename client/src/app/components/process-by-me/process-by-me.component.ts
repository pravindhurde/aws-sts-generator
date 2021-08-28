import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-process-by-me',
  templateUrl: './process-by-me.component.html',
  styleUrls: ['./process-by-me.component.less']
})
@Injectable({ providedIn: 'root' })

export class ProcessByMeComponent implements OnInit {
  userId: string | null
  processess: any[] = []
  headers = {}
  overlay=false
  pagination = {
    "totalRecords": 0,
    "limit": 10
  }
  loading = false;
  tempMap = {}
  page = 1;
  limit = 10
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.userId = null
    if (this.userId != null) {
      this.getProcessessByMe(this.userId).subscribe((data) => {
        this.processess = data.results;
        this.pagination = data.pagination;
        this.loading = false;
      })
    }
  }
  ngOnInit(): void {
    this.loading = true;
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId != null) {
      this.getProcessessByMe(this.userId).subscribe((data) => {
        this.processess = data.results;
        this.pagination = data.pagination;
        this.loading = false;
      })
    }
  }

  getProcessessByMe(userId: string): Observable<any> {
    var offset = (this.page - 1) * this.limit;
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    return this.http.get(environment.baseUrl + '/processes?requesterId=' + this.userId + '&' + `limit=${this.limit}&offset=${offset}`, { 'headers': this.headers });
  }
  setTempMap(map: any) {
    this.tempMap = map;
    
  }
  toggle(value){
    this.overlay=value
  }

  delete(id: string) {
    var offset = (this.page - 1) * this.limit;
    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    this.http.delete(environment.baseUrl + '/process/' + id, { 'headers': this.headers }).subscribe((res) => {
      const item = this.processess.find(item => item.id === id);
      this.processess.splice(this.processess.indexOf(item), 1);
    });
  }
  changePage(event: any) {
    this.page = parseInt(event.target.getAttribute('page'));
    if (this.userId != null) {
      this.getProcessessByMe(this.userId).subscribe((data) => {
        this.processess = data.results;
        this.pagination = data.pagination;
        this.loading = false;
      })
    }
  }

  limitChange(event: any) {
    this.limit = parseInt(event.target.value);
    this.page = 1;
    if (this.userId != null) {
      this.getProcessessByMe(this.userId).subscribe((data) => {
        this.processess = data.results;
        this.pagination = data.pagination;
        this.loading = false;
      })
    }
  }
}
