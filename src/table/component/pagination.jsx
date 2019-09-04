import React from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import _ from "lodash";

// we need to achieve something like this [ 1,2,3].map()
const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  // we want to achieve [1 ...pageCount]
  // we add 1 to it so that it can return the last number cos initially it will be zero
  const pages = _.range(1, pageCount + 1);

  return (
    <React.Fragment>
      <nav>
        <ul className="pagination">
          {pages.map(page => (
            <li
              style={{ cursor: "pointer" }}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={page}
            >
              <Link
                className="page-link"
                onClick={() => {
                  onPageChange(page);
                }}
                to={`/dashboard/${page}`}
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

// using prop-types to check for types in react
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
