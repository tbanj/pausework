import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Table from "./table";

// const x = <h1>ade</h1>; // react element

class SubParentTable extends Component {

  columns =
    [...this.props.requiredColumns,

    {
      path: `${this.props.approve_status}`, label: `${this.props.approveState}`,
      content: movie => (
        <button data-tip={`delete this item`} type="button"
          className={movie.btnColor}
          disabled
        > <span > <i className={`fa ${movie.statusIconType}`}></i></span>
          <ReactTooltip />
          {` ${movie.statusMessage}`}
        </button>
      )
    },
    {
      key: "View", content: (movie) => <Link data-tip={this.props.viewAppText}
        to={`/dashboard/${this.props.currentPage}/${movie._id}`} ><span > <i className="fa fa-eye"></i></span>
        <span><ReactTooltip /></span></Link>
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
    const { leaves, ...rest } = this.props;
    console.log('spread', this.props.currentPage);

    return (
      <Table
        columns={this.columnsModified}
        data={leaves}
        {...rest}
      />
    );

  }
}

export default SubParentTable;
