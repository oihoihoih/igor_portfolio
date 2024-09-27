import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

    return this.http.get<Project[]>(url).pipe(map((res) => res));
  }

  getProjectById() {}

  createProject(project: Project): Observable<Project> {
    const url = `${this.baseUrl}/projects`;

    return this.http.post<Project>(url, project);
  }

  updateProject() {}

  deleteProject(id: string): Observable<Project> {
    const url = `${this.baseUrl}/projects/${id}`;

    return this.http.delete<Project>(url);
  }
}
