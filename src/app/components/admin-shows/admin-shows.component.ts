// admin-shows.component.ts
import { Component, OnInit } from '@angular/core';
import { Show } from 'src/app/models/Show';
import { MovieService } from 'src/app/services/movie.service';
import { ShowService } from 'src/app/services/shows.service';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-admin-shows',
  templateUrl: './admin-shows.component.html',
  styleUrls: ['./admin-shows.component.css']
})
export class AdminShowsComponent implements OnInit {

  shows: Show[] = [];
  showAddShowForm = false;
  newShow: Show = {
    id: 0,
    showName: '',
    showDateTime: '',
    theatreName: '',
    movieName: ''
  };
  theatres: any[] = [];
  movies: any[] = [];


  constructor(private movieService:MovieService,private showService: ShowService,private theatreService: TheatreService) { }

  ngOnInit() {
    this.getAllShows();
    this.getAllTheatres();
    this.getAllMovies();
  }

  getAllShows() {
    this.showService.getAllShows().subscribe(
      (shows: Show[]) => {
        this.shows = shows;
      },
      error => {
        console.error('Error fetching shows:', error);
      }
    );
  }
  getAllTheatres() {
    this.theatreService.getAllTheatres().subscribe(
      (theatres: any[]) => {
        this.theatres = theatres;
      },
      error => {
        console.error('Error fetching theatres:', error);
      }
    );
  }
  getAllMovies() {
    this.movieService.getAllMovies().subscribe(
      (movies: any[]) => {
        this.movies = movies;
      },
      error => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  addShow() {
    if (this.newShow.showName.trim() !== '') {
      this.showService.addShow(this.newShow).subscribe(
        (addedShow: Show) => {
          this.shows.push(addedShow);
          this.resetNewShow();
        },
        error => {
          console.error('Error adding show:', error);
        }
      );
    }
  }

  removeShowById(id: number) {
    this.showService.removeShowById(id).subscribe(
      () => {
        this.shows = this.shows.filter(show => show.id !== id);
      },
      error => {
        console.error('Error removing show:', error);
      }
    );
  }

  resetNewShow() {
    this.newShow = {
      id: 0,
      showName: '',
      showDateTime: '',
      theatreName: '',
      movieName: ''
      // Add other properties as needed
    };
    this.showAddShowForm = false;
  }
}
