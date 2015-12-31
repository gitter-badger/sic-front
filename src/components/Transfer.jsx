import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';

import DeleteTransferMutation from '../mutations/DeleteTransferMutation';

class Transfer extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    transfer: React.PropTypes.object.isRequired
  }

  paid(e) {
    const {viewer, transfer} = this.props;

    Relay.Store.update(
      new DeleteTransferMutation({viewer, transfer})
    );
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
            <div>{transfer.from}</div>
            <i className="fa fa-fw fa-arrow-down"/>
            <div>{transfer.toAka}</div>
            <small>{transfer.to}</small>
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
            <button type="button" className="btn btn-primary" onClick={this.paid.bind(this)}>
              Paid
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

export default Relay.createContainer(Transfer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${DeleteTransferMutation.getFragment('viewer')}
      }
    `,
    transfer: () => Relay.QL`
      fragment on Transfer {
        from, to, toAka, amount, currency, dueDate, communication,
        ${DeleteTransferMutation.getFragment('transfer')}
      }
    `
  }
})
