// user-registration.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  userRegistrationForm!: FormGroup;
  submitted = false;
  user: any = {};

  constructor(private fb: FormBuilder, private security:AdminService,private router:Router) {}

  ngOnInit() {
    this.userRegistrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    });
  }

  get f() {
    return this.userRegistrationForm.controls;
  }

  registerUser() {
    this.submitted = true;
    console.log('Form Valid:', this.userRegistrationForm.valid);
  console.log('Form Values:', this.userRegistrationForm.value);
  
  
    if (this.userRegistrationForm.valid) {
      this.security.registerUser(this.userRegistrationForm.value).subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          alert('Registration successful');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/user-login']);
        },
        (error: any) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Check console for details.');
        }
      );
    } else {
      console.error('Form invalid. Cannot submit.');
    }
  }
  

}
