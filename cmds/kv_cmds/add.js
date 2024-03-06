import { addKeyVault } from '../../src/cli.js';

export default {
    command: 'add <name> <vault-name> <subscription-id>',
    desc: 'Add KeyVault with <vault-name> in <subscription-id> to config with <name>.',
    handler: (argv) =>
        addKeyVault(argv.name, argv.vaultName, argv.subscriptionId),
};
