// movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  
  private apiUrl = 'http://localhost:8383/api/movies';

  constructor(private http: HttpClient,private security:AdminService) {}

  getAllMovies(): Observable<Movie[]> {
   
    const token = this.security.getToken();
    if (token) 
    {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log(token);
      console.log(headers);
      return this.http.get<Movie[]>(this.apiUrl+"/getAllMovies",{ headers });
    }else {
      return new Observable<Movie[]>();
    }
  }

  
  getMovieByName(name: string): Observable<Movie> {
    
    const token = this.security.getToken();
  if (token) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    console.log('Headers:', headers);
    console.log('Data:', name);
   return this.http.get<Movie>(this.apiUrl+`/getMovieByName/${name}`, { headers });
  } else {
    return new Observable<Movie>(); // Consider handling this case differently
  }
}
  

  addMovie(movie: Movie): Observable<Movie> {
    const token = this.security.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log(token);
      console.log(headers);
    return this.http.post<Movie>(this.apiUrl + '/addMovie',movie, { headers });
  }else {
    return new Observable<Movie>();}}

  removeMovie(id: number): Observable<string> {
   
    const token = this.security.getToken();
    if (token) 
    {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      console.log(headers);
      return this.http.delete<string>(this.apiUrl+`delete/${id}`,{headers});
    }else {
      return new Observable<string>();
  }
}
  removeMovieByName(name: string): Observable<string> {
   // return this.http.delete<void>(`${this.apiUrl}/removeByName/${name}`);
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
