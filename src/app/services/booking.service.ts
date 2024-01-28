// booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/Booking'; // Assuming the model is in a 'models' folder

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8383/api/bookings';

  constructor(private http: HttpClient) {}

  bookSeat(booking: Booking): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bookSeat`, booking);
  }

  getSeatNumbersByShowId(showId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getSeatNumbersByShowId/${showId}`);
  }

  getSeatNumbersByUserId(userId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getSeatNumbersByUserId/${userId}`);
  }

}
