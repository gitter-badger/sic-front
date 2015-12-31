import React from 'react';
import Relay from 'react-relay';

import ToolBar from './ToolBar';
import Transfer from './Transfer';

class Dashboard extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  }

  render() {
    const transfers = this.props.viewer.transfers.edges;

    return (
      <div className="row">
        <div className="col-sm-12">
          <ToolBar/>
        </div>

        <div className="col-md-12">
          {/** Content Tab **/}
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="open">
              <div className="row">
                { transfers.map(({node}) =>
                    <div key={node.id} className="col-md-3">
                      <Transfer transfer={node}/>
                    </div>
                )}

              </div>
            </div>

            {/* Other panels*/}
            <div role="tabpanel" className="tab-pane" id="planned">
              <p>Nothing yet</p>
            </div>

            <div role="tabpanel" className="tab-pane" id="paid">
              <p className="alert alert-info"><strong>Hey!</strong> you've got no card "PAID"</p>

            </div>

            <div role="tabpanel" className="tab-pane" id="closed">
              <p>Nothing yet</p>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(Dashboard, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        transfers(first: 12345) {
          edges {
            node {
              id,
              ${Transfer.getFragment('transfer')}
            }
          }
        }
      }
    `
  }
})
