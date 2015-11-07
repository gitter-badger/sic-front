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
      <div className="row">
        <div className="col-md-12">
          {/** Tab **/}
          <div className="row tabRow">
            <ul className="nav nav-pills col-md-10" role="tablist">
              <li><a>Open <span className="badge">5</span></a></li>
              <li><a>Planned <span className="badge">3</span></a></li>
              <li><a>Paid <span className="badge">0</span></a></li>
              <li><a>Closed</a></li>
            </ul>

            <div className="col-md-2 actionButton text-right">
              <button className="btn btn-info" type="button">
                Ajouter une facture
                <i className="fa fa-plus fa-fw"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
