import React, { Component } from "react";
import Storage from "../localstorage/Storage";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import SubParentTable from "./SubParentTable";
import _ from "lodash";
// const movies = require("./../api/fakeMoviesService.js");

let movieListA = [];
const getItem = new Storage();
class ParentTable extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: "",
    sortColumn: this.props.tableSort,
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
    movieListA = getItem.getItemsFromStorage();
    this.setState({ movies: movieListA });
  };



  handleGenreSelected = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // use to sort ascending & descending order
  handleSort = sortColumn => {

    this.setState({ sortColumn: sortColumn });
  };

  render() {
    const {
      currentPage,
      pageSize,
      sortColumn,
    } = this.state;
    // removeColumn, requiredColumns,statusIconType, approve_status, approveState, viewAppText
    const { leaveSum, dataError, ...rest } = this.props;
    console.log('wahab ');

    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? AllMovies.filter(m => m.genre._id === selectedGenre._id)
    //     : AllMovies;

    const filtered = leaveSum;
    // sorting
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // array to populate data to users
    const leaves = paginate(sorted, currentPage, pageSize);
    console.log("hi", currentPage);

    return (
      <div>
        <div className="container-fluid">
          {leaves.length > 0 ? (
            <React.Fragment>
              <div className="row my-4">
                <div className="col">
                  <SubParentTable
                    leaves={leaves}
                    currentPage={currentPage}
                    sortColumn={sortColumn}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                    {...rest}
                  />
                </div>
              </div>
            </React.Fragment>
          ) : (
              <h3>{dataError ? "No leave record found" : "please wait "} <span><i className={dataError ? "" : `spinner-border text-primary`}></i></span></h3>
            )}
        </div>
        <Pagination
          onPageChange={this.handlePageChange}
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          {...rest}
        />

      </div>
    );
  }
}

export default ParentTable;
