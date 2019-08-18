import React, { Component } from "react";
import Storage from "../localstorage/Storage";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import Genres from "./genres";
import MoviesTable from "./moviesTable";
import _ from "lodash";
// const movies = require("./../api/fakeMoviesService.js");

let movieListA = [];
const getItem = new Storage();
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentWillMount() {
    if (getItem.getItemsFromStorage().length === 0) {
      this.handleStoreItem();
      return;
    }
    movieListA = getItem.getItemsFromStorage();
    this.setState({ movies: movieListA });
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ genres: genres });
  }

  handleStoreItem() {
    this.setState({ movies: getMovies() });
    getItem.storeItem(getMovies());
  }

  handleDelete = id => {
    getItem.deleteItemFromStorage(id);
    console.log(this.state.movies);
    movieListA = getItem.getItemsFromStorage();
    console.log(movieListA);
    this.setState({ movies: movieListA });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGenreSelected = genre => {
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // use to sort ascending & descending order
  handleSort = sortColumn => {
    console.log(sortColumn);

    this.setState({ sortColumn: sortColumn });
  };

  render() {
    const {
      currentPage,
      pageSize,
      movies: AllMovies,
      selectedGenre,
      genres,
      sortColumn
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? AllMovies.filter(m => m.genre._id === selectedGenre._id)
        : AllMovies;

    // sorting
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // array to populate data to users
    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div>
        <div className="container-fluid">
          {AllMovies.length > 0 ? (
            <React.Fragment>
              <div className="row my-4">
                <div className="col">
                  <h3>Showing movies {filtered.length} in the database</h3>
                  <MoviesTable
                    movies={movies}
                    sortColumn={sortColumn}
                    onDelete={this.handleDelete}
                    onLike={this.handleLike}
                    onSort={this.handleSort}
                  />
                </div>
              </div>
            </React.Fragment>
          ) : (
            <h3>No movies in the database</h3>
          )}
        </div>
        <Pagination
          onPageChange={this.handlePageChange}
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default Movies;
