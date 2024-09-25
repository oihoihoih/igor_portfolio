import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../model/project';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    const url = `${this.baseUrl}/projects`;
    const projects = this.http.get<Project[]>(url);
    return projects;
  }

  getProjectById() {}

  createProject() {}

  updateProject() {}

  deleteProject() {}
}
