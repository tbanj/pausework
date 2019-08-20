import React, { Component } from "react";
import ReactTooltip from 'react-tooltip';
// columns: array
// sortColum: object
// onSort: function
//
class TableHeader extends Component {
  state = {
    removeTip: true,
  }
  raiseSort = path => {
    console.log(path);
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      this.setState({ removeTip: false });
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) {
      return null;
    }
    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-up" />;
    }
    return <i className="fa fa-sort-down" />;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th data-tip={this.state.removeTip === true ? `click to sort` : ""}
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
              key={column.path || column.key}
            >
              {column.label} {this.renderSortIcon(column)}
              <span><ReactTooltip /></span>
            </th>
          ))}

        </tr>
      </thead>
    );
  }
}

export default TableHeader;
