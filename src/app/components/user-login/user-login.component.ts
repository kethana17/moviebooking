// user-login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/models/AuthRequest';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  response: any;
  token: any;
  authRequest: AuthRequest = new AuthRequest();
  isLoggedIn: boolean = false; 
  userId: string | undefined; 

  constructor(private userService:UserService, private router: Router,private security:AdminService) {}

  readFormData(formData: any) {
    this.authRequest.username = formData.form.value.username;
    this.authRequest.password = formData.form.value.password;
    
    this.getAccessToken(this.authRequest);
  }

  getAccessToken(authRequest: any) {
    let response = this.userService.getGeneratedToken(authRequest);

    response.subscribe((genToken) => {
      this.token = genToken;
     
      this.security.storeToken(genToken);
      console.log(genToken);
      this.accessApi(this.token);
    });
  }

  accessApi(token: any) {
    let response = this.userService.authorizationTestForUser(token);
    console.log(response);
    response.subscribe(
      (responseData) => {
        this.response = responseData;
        console.log(responseData);
        console.log(token);
        if (responseData === true) {
          this.isLoggedIn = true;
          console.log(this.isLoggedIn);
          alert('Login successful'); 
          this.navigateToUserDashboard();
        }
      }
    );
  }



navigateToUserDashboard() {
  this.router.navigate(['/user-home']);
}

}
