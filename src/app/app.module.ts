import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectItemComponent } from './project/project-item/project-item.component';
import { ProjectListComponent } from './project/project-list/project-list.component';

@NgModule({
  declarations: [AppComponent, ProjectItemComponent, ProjectListComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
