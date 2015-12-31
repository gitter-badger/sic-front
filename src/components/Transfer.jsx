import React from 'react';
import Relay from 'react-relay';
import { DropdownButton, MenuItem } from 'react-bootstrap/lib'
import moment from 'moment';

class Transfer extends React.Component {

  static propTypes = {
    transfer: React.PropTypes.object.isRequired
  }

  iPaid(e, from) {
    console.debug('I paid from', from)
  }

  render() {
    const {transfer} = this.props;

    let communication = <li className="list-group-item">{transfer.communication}</li>;
    if (!transfer.communication)
      communication = <li className="list-group-item text-muted"><em>No communication</em></li>;

    return (
      <div className="panel panel-default panel-card">
        <div className="panel-heading">
          <h3 className="panel-title">
            {transfer.from}<i className="fa fa-fw fa-arrow-right"/>{transfer.to}
          </h3>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            {transfer.amount}
            &nbsp;{transfer.currency}
          </li>
          {communication}
          <li className="list-group-item">
            {moment(transfer.dueDate).format('DD/MM/YYYY')}
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

export default Relay.createContainer(Transfer, {
  fragments: {
    transfer: () => Relay.QL`
      fragment on Transfer {
        from, to, amount, currency, dueDate, communication
      }
    `
  }
})
