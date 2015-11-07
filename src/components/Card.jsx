import React from 'react';
import Numeral from 'numeral';
import { DropdownButton, MenuItem } from 'react-bootstrap/lib'

export class Card extends React.Component {

  iPaid(e, from) {
    console.debug('I paid from', from)
  }

  render() {

    let communication = <li className="list-group-item">{this.props.communication}</li>;
    if (!this.props.communication)
      communication = <li className="list-group-item text-muted"><em>No communication</em></li>;

    return (
      <div className="panel panel-default panel-card">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.props.counterparty}
          </h3>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            {Numeral(this.props.amount).format('0.00')}
            &nbsp;{this.props.currency}
          </li>
          {communication}
          <li className="list-group-item">
            16/11/2015
          </li>
          <li className="list-group-item text-center">
            <DropdownButton bsStyle="primary" title="I paid from" id="account-dropdown" onSelect={this.iPaid.bind(this)}>
              <MenuItem eventKey="1">
                <strong>Mon compte belge</strong><br/>
                <small className="text-muted"><em>BE04 ... 3031</em></small>
              </MenuItem>
              <MenuItem eventKey="2">
                <strong>Mon compte lulu</strong><br/>
                <small className="text-muted"><em>LU00 ... 0000</em></small>
              </MenuItem>
            </DropdownButton>
          </li>
        </ul>
      </div>
    )
  }
}

Card.propTypes = {
  source: React.PropTypes.string.isRequired,
  counterparty: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  currency: React.PropTypes.string.isRequired,
  communication: React.PropTypes.string
};
