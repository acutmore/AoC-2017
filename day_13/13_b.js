'use strict';

const input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

const heights = input
    .split('\n')
    .map(line => {
        const parts = line.split(' ');
        return {
            depth: Number.parseInt(parts[0]),
            height: Number.parseInt(parts[1])
        };
    });

function scannerCaughtYou(time, height) {
    if (height === 0) {
        return false;
    }
    if (height === 1) {
        return true;
    }
    const roundTripDistance = (height - 1) * 2;
    return time % roundTripDistance === 0;
}

function calculateSeverity(delay) {
    return heights
        .filter(h => scannerCaughtYou( (delay + h.depth), h.height))
        .reduce((severity, h) => severity + (h.depth * h.height), 0);
}

console.log(calculateSeverity(0));

for (let delay = 0; delay < 1e8; delay++) {
    if (! heights.some(h => scannerCaughtYou((delay + h.depth, h.height)))) {
        console.log(delay);
        break;
    }
}
