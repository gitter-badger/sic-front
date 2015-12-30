import Relay from 'react-relay';

export default class AddUserMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation { addUser }`
  };

  getVariables() {
    return {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on addUserPayload {
        viewer {
          users
        },
        changedUserEdge
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
        connectionName: 'users',
        edgeName: 'changedUserEdge',
        rangeBehaviors: {
          '': 'append'
        }
      }
    ];
  }

}
