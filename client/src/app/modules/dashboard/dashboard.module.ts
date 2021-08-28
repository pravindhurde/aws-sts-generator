import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component'
import { StartProcessComponent } from '../../components/start-process/start-process.component'
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [DashboardComponent,
    SidenavComponent,
    StartProcessComponent,
    
  ],
  imports: [
    CommonModule,AppRoutingModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
