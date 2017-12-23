'use strict';
const INPUT = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

const registers = new Array(8).fill(0);
registers[0] = 1;

const program = INPUT
    .split('\n')
    .map(line => line.split(' '))
    .map(([ins, arg1, arg2], i) => {
        const node = {
            i,
            next: [i + 1]
        };
        if (ins === 'jnz') {
            node.next.push( i + Number.parseInt(arg2) );
        }
        return node;
    });

// TODO find cycles
