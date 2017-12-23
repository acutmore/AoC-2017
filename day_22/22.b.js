'use strict';
const INPUT = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

const CLEAN = '.';
const WEAK = 'W';
const INFECTED = '#';
const FLAGGED = 'F';
const flags = new Map();

const startingGrid = INPUT
    .split('\n')
    .map(line => line.split(''));

startingGrid.forEach((line, row) => line.forEach((char, col) => {
    switch (char) {
        case INFECTED: flags.set(`${row},${col}`, INFECTED);
    }
}));

let p = center(startingGrid);
let dir = [-1,0];
let infectionCount = 0;

console.time();
for (let i = 0; i < 1e7; i++) {
    const [r, c] = p;
    const pos = `${r},${c}`;
    const state = getFlag(flags, pos);
    const infected = updateFlag(flags, pos, state);
    if (infected) {
        infectionCount++;
    }
    dir = updateDir(dir, state);
    p = add(p, dir);
}
console.timeEnd(); // 8701.092ms

console.log(infectionCount); // 2511527

function left([r, c]) {
    return [-c, r];
}

function right([r, c]) {
    return [c, -r];
}

function reverse([r, c]) {
    return [-r, -c];
}

function add([r, c], [r2, c2]) {
    return [r + r2, c + c2];
}

function center(grid) {
    let c = Math.ceil(grid[0].length / 2);
    let r = Math.ceil(grid.length / 2);
    return [r - 1, c - 1];
}

function getFlag(flags, pos) {
    if (flags.has(pos)) {
        return flags.get(pos);
    } else {
        return CLEAN;
    }
}

function updateFlag(flags, pos, currentState) {
    switch (currentState) {
        case CLEAN: flags.set(pos, WEAK); return false;
        case WEAK: flags.set(pos, INFECTED); return true;
        case INFECTED: flags.set(pos, FLAGGED); return false;
        case FLAGGED: flags.delete(pos); return false;
    }
}

function updateDir(dir, currentState) {
    switch (currentState) {
        case WEAK: return dir;
        case CLEAN: return left(dir);
        case INFECTED: return right(dir);
        case FLAGGED: return reverse(dir);
    }
}
