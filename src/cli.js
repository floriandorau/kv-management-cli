import * as az from './azure.js';

import {
    initConfig as createConfig,
    existsConfig,
    getConfigPath,
    readConfig,
    writeConfig
} from './util/config.js';
import { printError, printSecrets } from './output.js';

export const initConfig = function () {
    const configPath = getConfigPath();
    if (existsConfig(configPath)) {
        return console.log(`Initialize: Config already exists at '${configPath}`);
    }

    console.log(`Initialize: Creating new config at '${configPath}'`);
    createConfig();
};

export const clearConfig = function () {
    const configPath = getConfigPath();
    if (!existsConfig(configPath)) {
        return console.log(`Initialize first: Config does not exist at '${configPath}`);
    }

    console.log(`Clearing config at '${configPath}'`);
    createConfig();
};

export const showConfig = function () {
    if (!existsConfig(getConfigPath())) {
        return console.log('Config does not exist yet. Please run "init" to create intial configuration.');
    }

    const config = readConfig();
    console.log(`Your current config is: '${JSON.stringify(config, null, '  ')}'`);
};

const resolveValue = async (fn)=> {
    const spinner = ora().start();
    const response = await fn;
    if (!response) {
        spinner.fail();
        throw Error('no valid response from cluster');
    }
    spinner.succeed();
}

export const getSecret = async function (vaultName, secretName, secretPrefix) {
    const config = readConfig();
    try {        
        if (config && config.vaults) {
            const vault = config.vaults.filter((vault) => vaultName in vault)[0];
            if (!vault) {
                console.log(`Can't find KeyVault with name '${vaultName}'. Please add KeyVault first to config`);
            }

            let secrets = [];
            if(secretName) {
                const secret = await az.getSecret(secretName, vault[vaultName])                
                secrets.push(secret)
            }
            else if(secretPrefix) {            
                const allSecrets = await az.listSecrets(vault[vaultName])

                 const filteredSecrets = allSecrets.filter((secret) => (secret.name??'').startsWith(secretPrefix))
                    .map(({name, contentType,id}) => ({name, contentType, id}))

                secrets = await Promise.all(
                    filteredSecrets.map(({name}) => az.getSecret(name, vault[vaultName]))
                );   
            }

            printSecrets(secrets)
        }
    } catch (err) {
        printError('Error while fetching secret', err)        
    }
};


export const addKeyVault = function (name, vaultName, subscriptionId) {
    let config = readConfig();
    try {
        if (config && config.vaults) {
            const vault = config.vaults.filter((vault) => {
                const [name, vaultConfig] = Object.entries(vault)[0]
                return vaultName == vaultConfig.vaultName
            })[0];
            if (vault) {
                console.log(
                    `KeyVault '${vaultName}' already exists: '${JSON.stringify(vault, null, '  ')}'`
                );
            } else {
                console.log(`Adding KeyVault '${vaultName}@${subscriptionId}' with name '${name}'`);
                config.vaults.push({
                    [name]: {
                        vaultName,
                        resourceGroup,
                        subscriptionId,
                    },
                });
            }
        } else {
            console.log(`Adding KeyVault '${vaultName}@${subscriptionId}'`);
            config = {
                vaults: [
                    {
                        [name]: {
                            vaultName,
                            resourceGroup,
                            subscriptionId,
                        },
                    },
                ],
            };
        }
        writeConfig(config);
    } catch (err) {
        printError('Error while adding KeyVault', err)                
    }
};


