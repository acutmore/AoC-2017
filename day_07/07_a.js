'use strict';
const input = require('fs')
    .readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n');

function parseLine(line) {
    const tokens = line.split(' ');
    const name = tokens[0];
    const weight = Number.parseInt(tokens[1].replace(/[()]/g, ''));
    const above = [];
    for (let i = 3; i < tokens.length; i++) {
        above.push(tokens[i].replace(',', ''));
    }

    return { name, weight, above };
}

const nodes = input.map(v => parseLine(v));

const root = nodes.find((possibleRoot, index, arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (i === index) {
            continue;
        }
        const n = arr[i];
        if (n.above.indexOf(possibleRoot.name) !== -1) {
            return false;
        }
    }
    return true;
});

console.log(root);