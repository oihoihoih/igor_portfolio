import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectItemComponent } from './project/project-item/project-item.component';
import { ProjectListComponent } from './project/project-list/project-list.component';

import { PipesModule } from './pipes/pipes.module';

//HeroIcons
import { NgIconsModule } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [AppComponent, ProjectItemComponent, ProjectListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PipesModule,
    NgIconsModule.withIcons({ featherAirplay, heroUsers }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
