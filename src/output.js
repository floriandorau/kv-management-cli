import Table from 'cli-table3';

import logSymbols from 'log-symbols';
import logUpdate from 'log-update';

export const printSecrets = (secrets) => {
    const table = new Table({
        head: ['#', 'Name', 'Value'],
        colAligns: ['center', 'left', 'left'],
        style: { head: [] },
        colWidths: [5, 30, 50],
    });

    secrets.forEach(({ name }, idx) => {
        table.push([idx + 1, name, 'Loading ...']);
    });

    logUpdate(table.toString());

    // Return secret update function
    return (secretName, secretValue) => {
        const idx = table.findIndex(([, name]) => name === secretName);

        // Update value in table
        const [num, name] = table[idx];
        table[idx] = [num, name, secretValue];

        logUpdate(table.toString());
    };
};

export const printError = (message, err) => {
    console.log(logSymbols.error, message, '\n');

    if (Array.isArray(err)) {
        err.forEach((e) => console.log(e.message));
    } else {
        console.log(err.message);
    }
};
