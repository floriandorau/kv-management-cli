import { commands } from './secret_cmds/index.js';

export default {
    command: 'secret <command>',
    desc: 'Interact with KeyVault secrets',
    builder: (yargs) => {
        yargs.usage('Usage: $0 context <command>').command(commands);
    },
};
