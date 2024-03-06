import { commands } from './kv_cmds/index.js';

export default {
    command: 'vault <command>',
    desc: 'Interact with KeyVault',
    builder: (yargs) => {
        yargs.usage('Usage: $0 context <command>').command(commands);
    },
};
