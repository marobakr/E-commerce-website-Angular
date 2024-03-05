import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AllordersComponent } from './allorders/allorders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NamedashBoardPipe } from 'src/app/pipes/namedash-board.pipe';

@NgModule({
  declarations: [AllordersComponent, NamedashBoardPipe],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPaginationModule,
    FormsModule,
  ],
})
export class DashboardModule {}
