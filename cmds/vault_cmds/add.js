import { addVault } from '../../src/cli.js';

export default {
    command: 'add',
    desc: 'Add KeyVault <vault-name> of <subscription-id> to config with <name>.',
    builder: (yargs) =>
        yargs.options({
            n: {
                alias: 'name',
                describe: 'Name of vault for local reference',
                demandOption: true,
                type: 'string',
            },
            v: {
                alias: 'vault-name',
                describe: 'Name of Azure KeyVault',
                demandOption: true,
                type: 'string',
            },
            s: {
                alias: 'subscription',
                describe: 'Subscription id',
                demandOption: true,
                type: 'string',
            },
        }),
    handler: (argv) => addVault(argv.name, argv.vaultName, argv.subscription),
};
