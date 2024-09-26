import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashProjectListComponent } from './pages/dash-project-list/dash-project-list.component';

import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import { heroPencil, heroTrash, heroPower } from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [DashboardLayoutComponent, DashProjectListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgIconsModule.withIcons({ heroPencil, heroTrash, heroPower }),
  ],
  providers: [provideNgIconsConfig({ size: '2.4rem' })],
})
export class DashboardModule {}
