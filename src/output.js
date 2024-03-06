import Table from 'cli-table3';

import logSymbols from 'log-symbols';

export const printSecrets = (secrets) => {
    const table = new Table({
        head: ['#', 'Name', 'Value'],
        colAligns: ['left', 'left', 'left'],
        style: { head: [] },
    });

    secrets.forEach(({ name, value }, idx) => {
        table.push([idx + 1, name, value]);
    });

    console.log(table.toString());
};

export const printError = function (message, err) {
    console.log(logSymbols.error, message, '\n');
    console.log(err.message);
};
