import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashProjectListComponent } from './pages/dash-project-list/dash-project-list.component';
import { DashAddProjectComponent } from './pages/dash-add-project/dash-add-project.component';
import { DashEditProjectComponent } from './pages/dash-edit-project/dash-edit-project.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'project-list', component: DashProjectListComponent },
      { path: 'project-add', component: DashAddProjectComponent },
      { path: 'project-edit/:id', component: DashEditProjectComponent },
      { path: '**', redirectTo: 'project-list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
