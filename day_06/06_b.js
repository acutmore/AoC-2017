'use strict';

const input = `14 0 15 12 11 11 3 5 1 6 8 4 9 1 8 4`;
// const input = `0 2 7 0`;

const banks = input.split(' ')
    .map(v => Number.parseInt(v));

const visitedStates = new Set();
let loopCount = undefined;

function distrubute() {
    visitedStates.add(JSON.stringify(banks));
    if (loopCount !== undefined) {
        loopCount.count++;
    }
    const highest = banks.reduce((acc, v, i) => {
        const index = acc.index;
        const max = acc.max;
        if (v > max) {
            acc.max = v;
            acc.index = i;
        }
        return acc;
    }, { max: Number.NEGATIVE_INFINITY, index: -1 })
        .index;
    
    const amount = banks[highest];
    banks[highest] = 0;
    for (let i = 1; i <= amount; i++) {
        const out = (highest + i) % banks.length;
        banks[out] = banks[out] + 1;
    }
    const currentState = JSON.stringify(banks);
    if (visitedStates.has(currentState)) {
        if (loopCount === undefined) {
            loopCount = { target: currentState, count: 0 };
        } else {
            if (currentState === loopCount.target) {
                console.log(loopCount.count);
                throw new Error('end');
            }
        }
    }
}

const max_safe_iterations = 1000000;
for (let i = 0; i < max_safe_iterations; i++) {
    distrubute();
}

