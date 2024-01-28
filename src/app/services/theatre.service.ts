import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theatre } from '../models/Theatre';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class TheatreService {
  private apiUrl = 'http://localhost:8383/api/theatres';

  constructor(private http: HttpClient,private security:AdminService) {}

  addTheatre(theatre: Theatre): Observable<Theatre> {
    //return this.http.post<Theatre>(`${this.apiUrl}/addTheatre`, theatre);
    const token = this.security.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log(token);
      console.log(headers);
    return this.http.post<Theatre>(this.apiUrl + '/addTheatre',theatre, { headers });
  }else {
    return new Observable<Theatre>();}}

  getAllTheatres(): Observable<Theatre[]> {
    //return this.http.get<Theatre[]>(`${this.apiUrl}/getAllTheatres`);
    const token = this.security.getToken();
    if (token) 
    {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log(token);
      console.log(headers);
      return this.http.get<Theatre[]>(this.apiUrl+"/getAllTheatres",{ headers });
    }else {
      return new Observable<Theatre[]>();
    }
  }


  removeTheatreById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeTheatre/${id}`);
  }

  removeTheatreByName(name: string): Observable<string> {
    //return this.http.delete<void>(`${this.apiUrl}/removeByName/${name}`);
    const token = this.security.getToken();
    if (token) 
    {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      console.log(headers);
      return this.http.delete<string>(this.apiUrl+`/removeByName/${name}`,{headers});
    }else {
      return new Observable<string>();
  }
  }
  }
