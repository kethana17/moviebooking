import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/models/AuthRequest';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent {
  /*username: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  login(): void {
    this.adminService.verifyAdminCredentials(this.username, this.password).subscribe(
      () => {
        // Redirect to the admin home component upon successful login
        this.router.navigate(['/admin-home']);
      },
      (error) => {
        this.loginMessage = 'Invalid credentials. Login failed.';
      }
    );
  }*/

  response:any;
  token:any;
  isLoggedIn: boolean = false; 

  authRequest: AuthRequest = new AuthRequest();
  constructor(private adminLogin:AdminService, private router: Router){}


  ngOnInit(): void {
    
    
  }


   readFormData(formData:any){

      this.authRequest.username = formData.form.value.username;
      this.authRequest.password = formData.form.value.password;

      this.getAccessToken(this.authRequest);

   }



  public getAccessToken(authRequest:any){

   let response =  this.adminLogin.getGeneratedToken(authRequest);

      response.subscribe( (genToken)=> 
      {  this.token = genToken ;
        this.adminLogin.storeToken(genToken);
        console.log(genToken);  
        this.accessApi(this.token) });

      

  }

  public accessApi(token:any){

   
      let response = this.adminLogin. authorizationTest(token);
    
      response.subscribe(
        (responseData) => {
          this.response = responseData;
          console.log(responseData);
          console.log(token);
          if (responseData === true) {
            this.isLoggedIn = true;
            console.log(this.isLoggedIn);
            alert('Login successful'); 
            this.navigateToAdminDashboard();
          }
        }
      );
    }
    
    
    navigateToAdminDashboard() {
      this.router.navigate(['/admin-home']);
    }
}
