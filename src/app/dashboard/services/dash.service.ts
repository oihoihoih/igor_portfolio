import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from '../../models/project';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // GET ALL PROJECTS
  getAllProjects(): Observable<Project[]> {
    const url = `${this.baseUrl}/projects`;
    return this.http.get<Project[]>(url).pipe(map((res) => res));
  }

  // GET PROJECT BY ID
  getProjectById(id: string): Observable<Project> {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.http.get<Project>(url);
  }

  // CREATE PROJECT
  createProject(project: Project): Observable<Project> {
    const url = `${this.baseUrl}/projects`;

    return this.http.post<Project>(url, project);
  }

  // DELETE PROJECT
  deleteProject(id: string): Observable<Project> {
    const url = `${this.baseUrl}/projects/${id}`;

    return this.http.delete<Project>(url);
  }

  // EDIT PROJECT
  editProject(id: string, projectData: FormData): Observable<Project> {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.http.put<Project>(url, projectData);
  }

  // UPLOAD IMAGE
  uploadFile(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/projects/uploads`;
    console.log(formData);
    return this.http.post<any>(url, formData);
  }
}
