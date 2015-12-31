import Relay from 'react-relay';
import moment from 'moment';

export default class DeleteTransferMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
    transfer: () => Relay.QL`
      fragment on Transfer {
        id
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation { deleteTransfer }`
  };

  getVariables() {
    const {id} = this.props.transfer;
    return {id};
  }

  getFatQuery() {
    return Relay.QL`
      fragment on deleteTransferPayload {
        viewer {
          transfers
        },
        id
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'transfers',
      deletedIDFieldName: 'id'
    }];
  }

}
