import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.less']
})
@Injectable({ providedIn: 'root' })
export class StartProcessComponent implements OnInit {
  requestBody = {}
  headers = {}
  startProcessData = {}
  startProcessDetails = {};
  preview = {}
  approvalLevelMap: any[] = []
  errorMessage;
  showError=false;
  userId: string | null
  callbackCheck =false
  headerForCallback={
    "Authorization": "Basic dXNlci1vbmU6cGFzcy1vbmU=", 
    "Content-Type": "application/json"
  }
  callBackRequestParams =  {
    "callBackUrl": "https://speijkrvdb.execute-api.us-east-1.amazonaws.com/DEV/api/callback-with-basic-auth",
    "headers" : this.headerForCallback,
    "callBackRequestBody": {
      "name": "hello"
    }
}
  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) private document: Document) { this.userId = null }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  createProcess(): Observable<any> {

    this.headers = { 'Tenant-Code': 'd0cf718e-396e-4e68-a5ff-c010fa4f9a5a', 'Authorization': 'Basic dXNlci1vbmU6cGFzcy1vbmU=' }
    return this.http.post(environment.baseUrl + '/start-process', this.preview, { 'headers': this.headers });
  }

  getPreview() {
    this.startProcessDetails ={}
    if (this.userId) {
      var approvalMap = {}
      this.approvalLevelMap.forEach((approval, index) => {
        var assigneeList: any[] = [];
        approval.approvers.forEach(approver => {
          assigneeList.push({
            "name": approver.substring(0, 2),
            "userId": approver,
            "emailId": approver.substring(0, 2) + "@zs.com"
          })
        });
        approvalMap[index] = {
          "allMustComplete": approval.allMustComplete,
          "allMustApprove": approval.allMustApprove,
          "assigneeList": assigneeList
        }
      });
      this.preview = {
        "requester": {
          "name": `${this.userId.substring(0, 2)}`,
          "emailId": `${this.userId.substring(0, 2)}` + "@zs.com",
          "userId": `${this.userId}`
        },
        "approvals": {
          "approvalLevels": this.approvalLevelMap.length,
          "approvalLevelMap": approvalMap
        },
        "callBackRequestParams":this.callBackRequestParams,

      }
    }
    console.log(this.preview);
    
    
  }

  getStartProcess(event: any) {
    this.showError = false;
    this.errorMessage = '';
    event.preventDefault();
    this.getPreview();
    this.createProcess().subscribe((data) => {
      this.preview = {}
      this.startProcessDetails = data;
    }, (error) => {
      console.log(error.error['message']);
      this.errorMessage = error.error['message'];
      this.showError = true;
    });


  }
  addLevel() {
    this.showError = false;
    this.approvalLevelMap.push({
      allMustComplete: false,
      allMustApprove: false,
      approversCount: 0,
      approvers: []
    })
    console.log(this.approvalLevelMap);
    this.getPreview()

  }
  removeLevel(i: number) {
    this.showError = false;
    this.approvalLevelMap.splice(i, 1);
    this.getPreview()
  }
  addApprover(i: number, event: any) {
    this.showError = false;
    console.log(i, event.target.value);
    var count = parseInt(event.target.value)
    var approvalLevelMapi = this.approvalLevelMap[i]
    var newApprovers = {
      allMustComplete: approvalLevelMapi.allMustComplete,
      allMustApprove: approvalLevelMapi.allMustApprove,
      approvers: approvalLevelMapi.approvers,
      approversCount: count
    }
    if (count < approvalLevelMapi.approversCount) {
      for (let j = 0; j < approvalLevelMapi.approversCount - count; j++) {
        newApprovers.approvers.pop();
      }
    }
    else {
      for (let j = 0; j < count - approvalLevelMapi.approversCount; j++) {
        newApprovers.approvers.push('');
      }
    }

    this.approvalLevelMap[i] = newApprovers
    console.log(this.approvalLevelMap)
    this.getPreview()
  }
  numCount(n: number): Array<number> {
    return Array(n);
  }

  updateUsers(i: number, k: number, event: any) {
    this.showError = false;
    console.log(i, k, event.target.value);
    var approverLevel = this.approvalLevelMap[i];


    var updateApprovers = {
      allMustComplete: approverLevel.allMustComplete,
      allMustApprove: approverLevel.allMustApprove,
      approvers: [...approverLevel.approvers.splice(0, k), event.target.value, ...approverLevel.approvers.splice(k + 1)],
      approversCount: approverLevel.approversCount
    }
    console.log("hello");

    this.approvalLevelMap = [...this.approvalLevelMap.splice(0, i), updateApprovers, ...this.approvalLevelMap.splice(i + 1)]
    console.log(this.approvalLevelMap)
    this.getPreview()

  }
  updateFlag(i: number, event: any) {
    this.showError = false;
    event.preventDefault()
    console.log(i, event.target.name, event.target.checked)
    var newApprovers = {}
    if (event.target.name == `allMustComplete ${i}`) {
      newApprovers = {
        allMustComplete: event.target.checked,
        allMustApprove: this.approvalLevelMap[i].allMustApprove,
        approvers: this.approvalLevelMap[i].approvers,
        approversCount: this.approvalLevelMap[i].approversCount
      }

    }
    else {
      newApprovers = {
        allMustComplete: this.approvalLevelMap[i].allMustComplete,
        allMustApprove: event.target.checked,
        approvers: this.approvalLevelMap[i].approvers,
        approversCount: this.approvalLevelMap[i].approversCount
      }
    }

    console.log(event.target.value);
    this.approvalLevelMap = [...this.approvalLevelMap.splice(0, i), newApprovers, ...this.approvalLevelMap.splice(i + 1)]
    console.log(this.approvalLevelMap)
    this.getPreview()

  }

  isEmpty(obj: any) {
    return Object.keys(obj).length
  }

  updateCallback(event){
    console.log(event.target.name);
      this.callBackRequestParams = {...this.callBackRequestParams , [event.target.name]:JSON.parse(event.target.value)}
      console.log(this.callBackRequestParams);
    this.getPreview()

      
  }
  updateHeaders(event){
    
      this.headerForCallback = {...this.headerForCallback , [event.target.name]:JSON.parse(event.target.value)}
      this.callBackRequestParams ={...this.callBackRequestParams,headers:this.headerForCallback}
      console.log(this.headerForCallback);
    this.getPreview()

      
  }
  callback(event){
    this.callbackCheck = event.target.checked
    this.getPreview()
  }

}
