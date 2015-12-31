import React from 'react';

import { Link } from 'react-router';

export default class ToolBar extends React.Component {
  render() {
    return (
      <div className="row tool-bar">
        <div className="col-md-12">
          <Link to="/transfer">
            <button className="btn btn-info pull-right" type="button">
              New transfer
              <i className="fa fa-plus fa-fw"></i>
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
