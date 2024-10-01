import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashProjectListComponent } from './pages/dash-project-list/dash-project-list.component';

import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import {
  heroPencil,
  heroTrash,
  heroPower,
  heroPlus,
} from '@ng-icons/heroicons/outline';
import { DashAddProjectComponent } from './pages/dash-add-project/dash-add-project.component';
import { DashEditProjectComponent } from './pages/dash-edit-project/dash-edit-project.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashProjectListComponent,
    DashAddProjectComponent,
    DashEditProjectComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgIconsModule.withIcons({ heroPencil, heroTrash, heroPower, heroPlus }),
  ],
  providers: [provideNgIconsConfig({ size: '2.4rem' })],
})
export class DashboardModule {}
