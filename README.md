# kv-management-cli

`kv` is a command line tool that should help to easily find secrets of a Azure KeyVault. Therefore it uses `Azure CLI` in the background.

## Prerequisites

Make sure you use a Node version of at least `14.1.0`. Besides Node, `Azure CLI` needs to be installed on your machine.

## Install

`npm install -g @floriandorau/kv-management-cli`

## Usage

Run `kv --help` to see how to use it.

```bash
kv <command>

Commands:
  kv config <command>    Manage KeyVault configuration
  kv vault <command>     Interact with KeyVault
  kv completion         generate completion script

Options:
  --version  Show version
  --help     Show help
```

## Before you start

### Init `kv` configuration

Before you can use `kv` you need to set up a application config in your home directory. In order to do so you can use the following command. 

```bash
kv config init
```

This will create an empty config file where `kv` will store its configuration.

### Add KeyVault to local configuration

Next, you need to configure your favorite KeyVaults locally. To add a new Vault with desired `name` in your configuration, use the following command.

```bash
kv vault add {name} {vault-name} {subscription-id}
```

You can add multiple vaults to your configuration. Later you can use name to get `kv vault get {name} {secret-name}`.

```bash
Usage: kv config <command>

Commands:
  kv config clear  Clears your current configuration
  kv config init   Initializes app diretory with empty config.yml
  kv config show   Prints your current configuration

Options:
  --version  Show version number                                                                                                                                                                                                                                             [boolean]
  --help     Show help                                                                                                                                                                                                                                                       [boolean]

Examples:
  kv config show  prints your current config
```
