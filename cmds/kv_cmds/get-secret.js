import { getSecret } from '../../src/cli.js';

export default {
    command: 'get <vault-name>',
    desc: 'Get secret from KeyVault with <vault-name>. Use option to search by actual name or specific prefix',
    builder: (yargs) =>
        yargs.options({
            n: {
                alias: 'secret-name',
                describe: 'secret name to search for',
                type: 'string',
            },
            p: {
                alias: 'secret-prefix',
                describe: 'secret prefix to search for',
                type: 'string',
            },
        }),
    handler: (argv) => {
        getSecret(argv.vaultName, argv.secretName, argv.secretPrefix);
    },
};
