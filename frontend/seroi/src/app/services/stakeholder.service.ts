import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StakeholderService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllStakeholders(): Observable<HttpEvent<any>> {

    const req = new HttpRequest('GET', `${this.baseUrl}/allStakeholders`, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getStakeholder(id: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('GET', `${this.baseUrl}/stakeholder/${id}`, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  createStakeholder(stakeholder: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/createStakeholder`, stakeholder, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  editStakeholder(id: string, stakeholder: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('PUT', `${this.baseUrl}/editStakeholder/${id}`, stakeholder, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteStakeholder(id: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('DELETE', `${this.baseUrl}/deleteStakeholder/${id}`, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

}
