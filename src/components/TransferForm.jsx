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
    this.state = {
      transfer: {
        currency: 'EUR',
        dueDate: moment().format('YYYY-MM-DD')
      }
    }
  }

  linkState(p) {
    return {
      value: _.get(this.state, p),
      requestChange: (value) => this.setState((prevState) => _.set(prevState, p, value))
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const {viewer} = this.props;
    const {transfer} = this.state;

    Relay.Store.update(
      new AddTransferMutation({viewer, transfer}),
      {
        onSuccess: () => this.props.history.push('/'),
        onFailure: (e) => console.warn(e)
      }
    );
  }

  renderFrom() {
    return (
      <div className="form-group">
        <label htmlFor="source" className="col-sm-3 control-label">From</label>

        <div className="col-sm-9">
          <input type="text" className="form-control" id="source" valueLink={this.linkState('transfer.from')}/>
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

              <div className="form-group">
                <label htmlFor="source" className="col-sm-3 control-label">To</label>

                <div className="col-sm-9">
                  <input type="text" className="form-control" id="source" valueLink={this.linkState('transfer.to')}/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="amount" className="col-sm-3 control-label">Amount</label>

                <div className="col-sm-6">
                  <input type="number" className="form-control" id="amount" valueLink={this.linkState('transfer.amount')}/>
                </div>
                <div className="col-sm-3">
                  <select className="form-control" valueLink={this.linkState('transfer.currency')}>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="due-date" className="col-sm-3 control-label">Due date</label>

                <div className="col-sm-9">
                  <input type="date" className="form-control" id="due-date" valueLink={this.linkState('transfer.dueDate')}/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="communication" className="col-sm-3 control-label">Communication</label>

                <div className="col-sm-9">
                  <input type="text" className="form-control" id="communication"
                         valueLink={this.linkState('transfer.communication')}
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
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      ${AddTransferMutation.getFragment('viewer')}
    }`
  }
})
