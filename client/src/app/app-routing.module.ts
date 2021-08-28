import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartProcessComponent } from './components/start-process/start-process.component'
import { TasksByAssigneeComponent } from './components/tasks-by-assignee/tasks-by-assignee.component';
import { ProcessByMeComponent } from './components/process-by-me/process-by-me.component';
import { AllProcessComponent } from './components/all-process/all-process.component';
import { HistoricDataComponent } from './components/historic-data/historic-data.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { ListTasksByPidComponent } from './components/list-tasks-by-pid/list-tasks-by-pid.component';
import { ProcessByPidComponent } from './components/process-by-pid/process-by-pid.component';
import { LogsComponent } from './components/logs/logs.component';
import { CallbackComponent } from './components/callback/callback.component';
const routes: Routes = [
  {path:'start-process/:id',component:StartProcessComponent},
  {path:'tasks-by-assignee/:id',component:TasksByAssigneeComponent},
  {path : 'process-by-me/:id' , component: ProcessByMeComponent},
  {path : 'all-process' , component: AllProcessComponent},
  {path : 'historic-data/:id', component:HistoricDataComponent},
  {path : 'list-tasks', component : ListTasksComponent},
  {path : 'list-tasks-by-pid', component : ListTasksByPidComponent},
  {path : 'process-by-id', component : ProcessByPidComponent},
  {path : 'logs/:id', component : LogsComponent},
  {path : 'process/callback' ,component : CallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
