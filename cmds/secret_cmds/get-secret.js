import { getSecret } from '../../src/cli.js';

export default {
    command: 'get',
    desc: 'Get secret from KeyVault <vault>. Use option to search by actual name or specific prefix',
    builder: (yargs) =>
        yargs.options({
            v: {
                alias: 'vault',
                describe: 'Vault name where to search',
                demandOption: true,
                type: 'string',
            },
            n: {
                alias: 'secret-name',
                describe: 'Name of secret',
                type: 'string',
            },
            p: {
                alias: 'secret-prefix',
                describe: 'Prefix of secret name',
                type: 'string',
            },
        }),
    handler: (argv) => {
        getSecret(argv.vault, argv.secretName, argv.secretPrefix);
    },
};
