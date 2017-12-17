'use strict';

const stepCount = 316;

let buffer = [0];
let currentPosition = 0;

function doStep(counter) {
    const nextIndex = ((currentPosition + stepCount) % buffer.length) + 1;
    const before = buffer.slice(0, nextIndex);
    const after = buffer.slice(nextIndex);
    buffer = [...before, counter, ...after];
    currentPosition = nextIndex;
}

for (let i = 0; i < 2017; i++) {
    doStep(i + 1);
}

console.log(buffer[(currentPosition + 1) % buffer.length]);
