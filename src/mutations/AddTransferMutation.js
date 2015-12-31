import Relay from 'react-relay';
import moment from 'moment';

export default class AddTransferMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation { addTransfer }`
  };

  getVariables() {
    const {amount, ...others} = this.props.transfer;
    let x = {
      status: "OPEN",
      amount: Number(amount),
      ...others
    };
    console.debug('getVariables', x);
    return x;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on addTransferPayload {
        viewer {
          transfers
        },
        changedTransferEdge
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          viewer: this.props.viewer.id
        }
      },
      {
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'transfers',
        edgeName: 'changedTransferEdge',
        rangeBehaviors: {
          '': 'append'
        }
      }
    ];
  }

}
