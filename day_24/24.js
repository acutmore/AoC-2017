'use strict';
const INPUT = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

const components = INPUT
    .split('\n')
    .map(line => line.split('/'))
    .map(([rhs, lhs]) => [ Number.parseInt(rhs), Number.parseInt(lhs) ]);

const used = new Set();
let maxValue = Number.NEGATIVE_INFINITY;
let longest = [];

componentsWithPorts(0).forEach(c => findNext(0, [c]));

console.log(maxValue);
console.log(chainScore(longest));

function findNext(portsUsed, chain) {
    const [parentComponent] = chain;
    const nextPortsNeeded = portsUsed === parentComponent[0] ? parentComponent[1] : parentComponent[0]; 
    const newValue = chainScore(chain); 
    maxValue = Math.max(maxValue, newValue);
    if (chain.length > longest.length) {
        longest = chain;
    }
    else if (chain.length === longest.length) {
        if (chainScore(chain) > chainScore(longest)) {
            longest = chain;
        }
    }
    used.add(parentComponent);
    for (const next of componentsWithPorts(nextPortsNeeded)) {
        if (!used.has(next)) {
            findNext(nextPortsNeeded, [next, ...chain]);
        }
    }
    used.delete(parentComponent);
}

function componentsWithPorts(count) {
    return components
        .filter(([a, b]) => a === count || b === count);
}

function chainScore(chain) {
    return chain.reduce((acc, [a, b]) => acc + a + b, 0);
}
