'use strict';

const stepCount = 316;

let bufferSize = 1;
let currentPosition = 0;
let mostRecentValueInsertedInIndex1 = null;

function doStep(counter) {
    const nextIndex = ((currentPosition + stepCount) % bufferSize) + 1;
    if (nextIndex === 1) {
        mostRecentValueInsertedInIndex1 = counter;
    }
    bufferSize++;
    currentPosition = nextIndex;
}

for (let i = 0; i < 50000000; i++) {
    doStep(i + 1);
}

console.log(mostRecentValueInsertedInIndex1);
