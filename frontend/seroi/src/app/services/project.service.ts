import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAllProjects(): Observable<HttpEvent<any>> {
    const req = new HttpRequest('GET', `${this.baseUrl}/allProjects`, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getProject(id: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('GET', `${this.baseUrl}/project/${id}`, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  createProject(project: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/createProject`, project, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  editProject(id: string, project: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('PUT', `${this.baseUrl}/editProject/${id}`, project, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteProject(id: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('DELETE', `${this.baseUrl}/deleteProject/${id}`, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  addStakeholder(id: string, stakeholder: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/addStakeholder/${id}`, stakeholder, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteStakeholder(id: string, stakeholderid: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('DELETE', `${this.baseUrl}/deleteStakeholder/${id}/${stakeholderid}`, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  editStakeholder(id: string, stakeholderid: string, stakeholder: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('PUT', `${this.baseUrl}/editStakeholder/${id}/${stakeholderid}`, stakeholder, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getStakeholder(projectid: string, id: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('GET', `${this.baseUrl}/getStakeholder/${projectid}/${id}`, {
      responseType: 'json'
    });

    return this.http.request(req);
  }
}


