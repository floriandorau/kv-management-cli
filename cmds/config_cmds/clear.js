import { clearConfig } from '../../src/cli.js';

export default {
    command: 'clear',
    desc: 'Clears your current configuration',
    handler: () => clearConfig(),
};
