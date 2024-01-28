import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
 // private baseUrl = 'http://localhost:8585/api/admins'; // Replace with your actual backend URL

 // constructor(private httpClient: HttpClient) {}

  //verifyAdminCredentials(username: string, password: string): Observable<string> {
   // const url = `${this.baseUrl}/verify/${username}/${password}`;

   // return this.httpClient.get(url, { responseType: 'text' }).pipe(
    //  tap(response => console.log('Response from verifyAdminCredentials:', response)),
     // catchError(error => {
      //  console.error('Error in verifyAdminCredentials:', error);
       // throw error;
      //})
    //);
  //}

  private tokenKey: string = 'jwtToken';
  constructor(private http:HttpClient) { }
  baseURL:string = 'http://localhost:8383/api/';
  
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }


    getGeneratedToken(requestBody: any):Observable<string>{

        return this.http.post<string>(this.baseURL+"login/adminlogin",requestBody,{responseType: 'text' as 'json'});

    }
    storeToken(token: string): void {
      localStorage.setItem(this.tokenKey,token);
    }
   
  
    getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
  
    clearToken(): void {
      localStorage.removeItem(this.tokenKey);
    }
    registerUser(requestBody:any)

   {
    
   return this.http.post(this.baseURL+"users/add",requestBody,{responseType:'text'as 'json'})
   
    }
    
   
    
    

    authorizationTest(token:any){

      const userAuthorized = !!token; // For demonstration, considers any non-empty token as authorized

      return of(userAuthorized);

    }
}

