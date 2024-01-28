package com.hexaware.cinema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hexaware.cinema.entity.Booking;
import com.hexaware.cinema.entity.User;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    @Query("SELECT b.seatNumbers FROM Booking b WHERE b.show.id = :showId")
    List<String> findSeatNumbersByShowId(@Param("showId") int showId);

    @Query("SELECT b.seatNumbers FROM Booking b WHERE b.user.id = :userId")

	List<String> findSeatNumbersByUserId(int userId);

    @Query("SELECT b.show.id, b.id, b.seatNumbers FROM Booking b WHERE b.user.id = :userId")
    List<Object[]> getUserBookings(@Param("userId") int userId);

	List<Booking> findByUser(User user);
    

    
}