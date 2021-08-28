import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TasksByAssigneeComponent } from './components/tasks-by-assignee/tasks-by-assignee.component';
import { ProcessByMeComponent } from './components/process-by-me/process-by-me.component';
import { AllProcessComponent } from './components/all-process/all-process.component';
import { HistoricDataComponent } from './components/historic-data/historic-data.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { ListTasksByPidComponent } from './components/list-tasks-by-pid/list-tasks-by-pid.component';
import { ProcessByPidComponent } from './components/process-by-pid/process-by-pid.component';
import { LogsComponent } from './components/logs/logs.component';
import { HttpClientModule } from '@angular/common/http';
import { CallbackComponent } from './components/callback/callback.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksByAssigneeComponent,
    ProcessByMeComponent,
    AllProcessComponent,
    HistoricDataComponent,
    ListTasksComponent,
    ListTasksByPidComponent,
    ProcessByPidComponent,
    LogsComponent,
    CallbackComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
