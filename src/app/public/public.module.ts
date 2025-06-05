import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectTrailerComponent } from './pages/projects/project-trailer/project-trailer.component';
import { GameComponent } from './shared/game/game.component';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    ProjectsComponent,
    ProjectTrailerComponent,
    GameComponent,
  ],
  imports: [CommonModule, PublicRoutingModule, OverlayModule, PortalModule],
  exports: [],
})
export class PublicModule {}
