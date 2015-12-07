import React from 'react';
import _ from 'lodash';
import moment from 'moment';

export class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: {
        currency: 'EUR',
        dueDate: moment().format('YYYY-MM-DD')
      }
    }
  }

  linkInvoice(p) {
    return {
      value: this.state.invoice[p],
      requestChange: (value) => this.setState({
        invoice: _.set(this.state.invoice, p, value)
      })
    }
  }


  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <form className="form-horizontal">
            <fieldset>
              <legend>New transaction</legend>
              <div className="form-group">
                <label htmlFor="source" className="col-sm-3 control-label">From</label>

                <div className="col-sm-9">
                  <select className="form-control" id="source" valueLink={this.linkInvoice('from')}>
                    <option value="" disabled selected label="Please select a counterparty"/>
                    <option value="3">Annabelle</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="source" className="col-sm-3 control-label">To</label>

                <div className="col-sm-9">
                  <select className="form-control" id="source">
                    <option value="0">BE04 ... 3031</option>
                    <option value="1">LU00 ... 0000</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="amount" className="col-sm-3 control-label">Amount</label>

                <div className="col-sm-6">
                  <input type="number" className="form-control" id="amount" valueLink={this.linkInvoice('amount')}/>
                </div>
                <div className="col-sm-3">
                  <select className="form-control" valueLink={this.linkInvoice('currency')}>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="due-date" className="col-sm-3 control-label">Due date</label>

                <div className="col-sm-9">
                  <input type="date" className="form-control" id="due-date" valueLink={this.linkInvoice('dueDate')}/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="communication" className="col-sm-3 control-label">Communication</label>

                <div className="col-sm-9">
                  <input type="text" className="form-control" id="communication"
                         valueLink={this.linkInvoice('communication')}
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
