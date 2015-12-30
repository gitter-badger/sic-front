import getBabelRelayPlugin from 'babel-relay-plugin';

import schema from '../src/data/relay.schema.json';

export default getBabelRelayPlugin(schema.data, {
  abortOnError: true,
});
