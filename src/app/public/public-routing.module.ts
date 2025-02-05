import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          animation: 'isTop',
        },
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: { animation: 'isLeft' },
      },
      {
        path: 'about',
        component: AboutComponent,
        data: { animation: 'isBottom' },
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: { animation: 'isRight' },
      },
      //{ path: '**', redirectTo: '' }, // Redirigir cualquier otra ruta a la página principal pública
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
