import ora from 'ora';

import { exec } from './util/cmd.js';

export const getSecret = async (secretName, { vaultName, subscriptionId }) => {
    return _runAz(`Fetching secret ${secretName} of KeyVault ${vaultName}`, [
        'keyvault',
        'secret',
        'show',
        '--name',
        secretName,
        '--vault-name',
        vaultName,
        '--subscription',
        subscriptionId,
    ]);
};

export const listSecrets = async ({ vaultName, subscriptionId }) => {
    return _runAz(`Listing secrets of KeyVault ${vaultName}`, [
        'keyvault',
        'secret',
        'list',
        '--vault-name',
        vaultName,
        '--subscription',
        subscriptionId,
    ]);
};

const _parseResponse = (response) => JSON.parse(response);

const _runAz = async (
    message,
    args,
    options = { parseResponse: true, debug: false }
) => {
    const spinner = ora(message).start();

    try {
        const response = await exec('az', args, options);
        if (!response) {
            spinner.fail();
            throw Error('no valid response from cluster');
        }
        spinner.succeed();

        return options.parseResponse ? _parseResponse(response) : response;
    } catch (e) {
        spinner.fail();
        throw e;
    }
};
