import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NamedashBoardPipe } from 'src/app/pipes/namedash-board.pipe';
import { HttpClientModule } from '@angular/common/http';
import { DashBoardDataComponent } from './dash-board-data/dash-board-data.component';

@NgModule({
  declarations: [NamedashBoardPipe, DashBoardDataComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class DashboardModule {}
