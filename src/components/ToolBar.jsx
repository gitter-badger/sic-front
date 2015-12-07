import React from 'react';

import { Link } from 'react-router';

export default class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div className="row tool-bar">
        <div className="col-md-12">
          <Link to="invoice">
            <button className="btn btn-info pull-right" type="button">
              New Invoice
              <i className="fa fa-plus fa-fw"></i>
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
