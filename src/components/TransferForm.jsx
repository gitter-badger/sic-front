import React from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import moment from 'moment';
import {Link} from 'react-router';

import AddTransferMutation from '../mutations/AddTransferMutation';

class TransferForm extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const users = this.props.viewer.users.edges;
    const defaultFrom = users[0].node;
    const defaultTo = users.filter(({node}) => node.accounts[0])[0].node

    this.state = {
      currency: 'EUR',
      dueDate: moment().format('YYYY-MM-DD'),
      from: this.labelizeUser(defaultFrom),
      to: defaultTo.accounts[0],
      toAka: this.labelizeUser(defaultTo)
    }
  }

  labelizeUser = ({firstName, lastName}) => `${firstName} ${lastName}`

  linkState(p) {
    return {
      value: _.get(this.state, p),
      requestChange: (value) => this.setState((prevState) => _.set(prevState, p, value))
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const {viewer} = this.props;
    const transfer = this.state;

    Relay.Store.update(
      new AddTransferMutation({viewer, transfer}),
      {
        onSuccess: () => this.props.history.push('/'),
        onFailure: (e) => console.warn(e)
      }
    );
  }

  renderFrom() {
    const users = this.props.viewer.users.edges;
    return (
      <div className="form-group">
        <label htmlFor="source" className="col-sm-3 control-label">From</label>

        <div className="col-sm-9">
          <select className="form-control" id="source" valueLink={this.linkState('from')}>
            { users.map(({node}) =>
              <option key={node.id} value={this.labelizeUser(node)} label={this.labelizeUser(node)}/>
            )}
          </select>
        </div>
      </div>
    )
  }

  renderTo() {
    const {to} = this.state;
    const users = this.props.viewer.users.edges.filter(({node}) => node.accounts[0]);

    const handleChange = (e) => {
      const {toAka} = _.find(e.target, (o) => o.selected).dataset;

      this.setState({to: e.target.value, toAka: toAka});
    }

    return (
      <div className="form-group">
        <label htmlFor="source" className="col-sm-3 control-label">From</label>

        <div className="col-sm-9">
          <select className="form-control" id="source" value={to} onChange={handleChange}>
            { users.map(({node}) =>
              <optgroup key={node.id} label={`${node.firstName} ${node.lastName}`}>
              { node.accounts.map((account) =>
                <option key={account} value={account} label={account} data-to-aka={this.labelizeUser(node)}/>
              )}
              </optgroup>
            )}
          </select>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <form className="form-horizontal" onSubmit={this.onFormSubmit.bind(this)}>
            <fieldset>
              <legend>New transfer</legend>
              {this.renderFrom()}
              {this.renderTo()}


              <div className="form-group">
                <label htmlFor="amount" className="col-sm-3 control-label">Amount</label>

                <div className="col-sm-6">
                  <input type="number" className="form-control" id="amount" valueLink={this.linkState('amount')}/>
                </div>
                <div className="col-sm-3">
                  <select className="form-control" valueLink={this.linkState('currency')}>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="due-date" className="col-sm-3 control-label">Due date</label>

                <div className="col-sm-9">
                  <input type="date" className="form-control" id="due-date" valueLink={this.linkState('dueDate')}/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="communication" className="col-sm-3 control-label">Communication</label>

                <div className="col-sm-9">
                  <input type="text" className="form-control" id="communication"
                         valueLink={this.linkState('communication')}
                    />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-12">
                  <button type="submit" className="btn btn-primary pull-right">Submit</button>
                  <button type="button" className="btn btn-link pull-right">Cancel</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>

    )
  }
}

export default Relay.createContainer(TransferForm, {
  prepareVariables() {
    return {
      limit: -1 >>> 1
    };
  },

  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      users(first: $limit) {
        edges {
          node {
            id, firstName, lastName, accounts
          }
        }
      }
      ${AddTransferMutation.getFragment('viewer')}
    }`
  }
})
