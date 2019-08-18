// import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6bccd471815",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInstock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6bccd471816",
    title: "Die Hard",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInstock: 5,
    dailyRentalRate: 2.5
  },
  {
    _id: "5b21ca3eeb7f6bccd471817",
    title: "Fast & Furious",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInstock: 4,
    dailyRentalRate: 2.5
  },
  {
    _id: "5b21ca3eeb7f6bccd471818",
    title: "Get Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInstock: 7,
    dailyRentalRate: 3.5
  }
];

module.exports = movies;
