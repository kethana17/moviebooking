// show.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../models/Show'; // Make sure to import the correct path for your Show model
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  private apiUrl = 'http://localhost:8383/api/shows';

  constructor(private http: HttpClient,private security:AdminService){}

  addShow(show: Show): Observable<Show> {
    //return this.http.post<Show>(this.apiUrl, show);
    const token = this.security.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log(token);
      console.log(headers);
    return this.http.post<Show>(this.apiUrl + '/add',show, { headers });
  }else {
    return new Observable<Show>();}}


  getAllShows(): Observable<Show[]> {
    //return this.http.get<Show[]>(this.apiUrl);
    const token = this.security.getToken();
    if (token) 
    {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log(token);
      console.log(headers);
      return this.http.get<Show[]>(this.apiUrl+"/getall",{ headers });
    }else {
      return new Observable<Show[]>();
    }
  }

  removeShowById(id: number): Observable<string> {
    //return this.http.delete<void>(`${this.apiUrl}/${id}`);
    const token = this.security.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      console.log('Headers:', headers);
      console.log('Data:', id);
     return this.http.get<string>(this.apiUrl+`/removeshow/${id}`, { headers });
    } else {
      return new Observable<string>(); // Consider handling this case differently
    }
  }

  getAllShowsByMovieName(movieName: string): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/byMovie/${movieName}`);
  }

  // Other methods for updating shows, retrieving shows by ID, etc.
}
