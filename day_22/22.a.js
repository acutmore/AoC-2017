'use strict';
const INPUT = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

const infected = new Set();

const startingGrid = INPUT
    .split('\n')
    .map(line => line.split(''));

startingGrid.forEach((line, row) => line.forEach((char, col) => {
    switch (char) {
        case '#': infected.add(`${row},${col}`);
    }
}));

let p = center(startingGrid); 
let dir = [-1,0]; 
let infectionCount = 0;

for (let i = 0; i < 1e4; i++) {
    const [r, c] = p;
    const pos = `${r},${c}`;
    if (infected.has(pos)) {
        infected.delete(pos);
        dir = right(dir);
    } else {
        infectionCount++;
        infected.add(pos);
        dir = left(dir);
    }
    p = add(p, dir);
}

console.log(infectionCount);

function left([r, c]) {
    return [-c, r];
}

function right([r, c]) {
    return [c, -r];
}

function add([r, c], [r2, c2]) {
    return [r + r2, c + c2];
}

function center(grid) {
    let c = Math.ceil(grid[0].length / 2);
    let r = Math.ceil(grid.length / 2);
    return [r - 1, c - 1];
}
