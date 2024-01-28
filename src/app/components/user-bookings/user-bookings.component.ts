// user-bookings.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css'],
})
export class UserBookingsComponent implements OnInit {
  user: User | undefined;
  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to route params to get the user ID
    this.route.parent?.params.subscribe((params) => {
      const userId = +params['id']; // Convert to number

      // Fetch user details based on the user ID using the UserService
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    });
  }
}
