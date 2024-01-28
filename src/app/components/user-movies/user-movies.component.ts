// user-movies.component.ts
import { Component, OnInit } from '@angular/core';
import { Show } from 'src/app/models/Show';
import { Movie } from 'src/app/models/Movie';
import { ShowService } from 'src/app/services/shows.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-user-movies',
  templateUrl: './user-movies.component.html',
  styleUrls: ['./user-movies.component.css'],
})
export class UserMoviesComponent implements OnInit {
  shows: Show[] = [];
  movies: Movie[] = [];
  showVisible: boolean = false;

  constructor(private showService: ShowService, private movieService: MovieService) {}

  ngOnInit(): void {
    // Load all shows
    this.showService.getAllShows().subscribe((shows) => {
      this.shows = shows;

      // Extract unique movie names from shows
      const uniqueMovieNames = Array.from(new Set(this.shows.map((show) => show.movieName)));

      // Load movie details for each unique movie name
      this.loadMovieDetails(uniqueMovieNames);
    });
  }

  loadMovieDetails(movieNames: string[]): void {
    // Load movie details for each movie name
    movieNames.forEach((movieName) => {
      this.movieService.getMovieByName(movieName).subscribe((movie) => {
        this.movies.push(movie);
      });
    });
  }

  // Method to get shows for a specific movie
  getShowsForMovie(movie: Movie): Show[] {
    return this.shows.filter((show) => show.movieName === movie.title);
  }

  // Method to set the selected movie
  
}
