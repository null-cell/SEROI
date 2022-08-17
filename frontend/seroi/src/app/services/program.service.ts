import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";

import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Program} from "../classes/program";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private baseUrl  = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPrograms(): Observable<HttpEvent<any>> {
    const req = new HttpRequest('GET', `${this.baseUrl}/allPrograms`,   {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getProgram(id: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('GET', `${this.baseUrl}/program/${id}`,   {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  editProgram(id: string, program: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('PUT', `${this.baseUrl}/editProgram/${id}`, program,  {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  createProgram(program: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/createProgram`, program,  {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteProgram(id: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('DELETE', `${this.baseUrl}/deleteProgram/${id}`,   {
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
