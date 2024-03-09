import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardDataComponent } from './dash-board-data/dash-board-data.component';

const routes: Routes = [{ path: '', component: DashBoardDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
