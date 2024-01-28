// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  

  private apiUrl = 'http://localhost:8383/api/'; // Update with your API URL

  constructor(private http: HttpClient) {}



  //createUser(user: User): Observable<User> {
   // return this.http.post<User>(`${this.apiUrl}`, user);
  //}

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  //authenticateUser(username: string, password: string): Observable<User> {
    //return this.http.get<User>(`${this.apiUrl}/authenticate/${username}/${password}`);
 // }

  // Add other methods as needed
  getGeneratedToken(requestBody: any):Observable<string> {
    console.log("Hi");
    return this.http.post<string>(this.apiUrl + "login/userlogin", requestBody, { responseType: 'text' as 'json' });
    
  }
  

  authorizationTestForUser(token: any): Observable<boolean> {
    // Simulate successful user login based on a valid token (You'll need to implement actual token validation logic here)
    // For example, if the token exists and is not expired, consider the user authorized
    const userAuthorized = !!token; // For demonstration, considers any non-empty token as authorized

    return of(userAuthorized); // Returning an observable of boolean using 'of' operator
  }

  
 
}
