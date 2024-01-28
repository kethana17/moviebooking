package com.hexaware.cinema.service;
import com.hexaware.cinema.dto.BookingDTO;

import java.util.List;

public interface IBookingService {

    void bookSeat(BookingDTO bookingDTO);

    List<String> getSeatNumbersByShowId(int showId);

	List<String> getSeatNumbersByUserId(int userId);

    List<Object[]> getUserBookings(int userId);
    List<BookingDTO> getBookingDTOsByUserId(int userId);

    int getTotalSeatNumbersByShowId(int showId);

    void removeBookingById(int bookingId);

    
}