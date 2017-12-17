'use strict';

const list = [];
const size = 256;
for (let i = 0; i < size; i++) {
    list.push(i);
}

const inputLengths = [18,1,0,161,255,137,254,252,14,95,165,33,181,168,2,188];

let currentPosition = 0;
let skipSize = 0;

while (inputLengths.length > 0) {
    hashStage();
}

console.log(list[0] * list[1])

function hashStage() {
    const nextLength = inputLengths.shift();
    if (typeof nextLength !== 'number') {
        throw new Error('nextLength invalid');
    }

    const contentsToReverse = [];
    
    for (let i = 0; i < nextLength; i++) {
        contentsToReverse.push(list[
            (currentPosition + i) % list.length
        ]);
    }

    contentsToReverse.reverse();

    for (let i = 0; i < nextLength; i++) {
        list[
            (currentPosition + i) % list.length
        ] = contentsToReverse[i];
    }

    currentPosition = (currentPosition + nextLength + skipSize) % list.length;
    skipSize++;
}
