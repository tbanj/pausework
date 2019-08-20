import React, { Component } from "react";
import ReactTooltip from 'react-tooltip';
import Table from "./table";

// const x = <h1>ade</h1>; // react element

class MoviesTable extends Component {

  columns =
    [...this.props.requiredColumns,

    {
      path: `${this.props.approvestatus}`, label: `${this.props.approveState}`,
      content: movie => (
        <button data-tip={`delete this item`} type="button"
          className={movie.btnColor}
          disabled
        >{this.props.buttonName} <span > <i className="fa fa-trash"></i></span>
          <ReactTooltip />
          {movie.statusMessage}
        </button>
      )
    },
    {
      key: "Delete",
      content: movie => (
        <button data-tip={`delete this item`} type="button"
          className=" btn waves-effect waves-light btn-rounded btn-outline-danger"
          onClick={() => this.props.onDelete(movie._id)}
        >Delete <span > <i className="fa fa-trash"></i></span>
          <ReactTooltip />
        </button>
      )
    }
    ];
  columnsModified = this.props.removeColumn ? this.columns.slice(this.props.removeColumn[0], this.props.removeColumn[1]) : this.columns

  render() {
    const { leaves, onSort, sortColumn } = this.props;
    console.log('spread', this.columnsModified);

    return (
      <Table
        columns={this.columnsModified}
        data={leaves}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );

  }
}

export default MoviesTable;
