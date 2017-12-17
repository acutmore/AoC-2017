'use strict';
const input = require('fs').readFileSync(__dirname + '/grid.txt', 'utf8');
// `##.#.#..
// .#.#.#.# 
// ....#.#.
// #.#.##.#
// .##.#...
// ##..#..#
// .#...#..
// ##.#.##.`;

const size = 128;

const inputGrid = input.split('\n'); 
const groupGrid = makeGrid(size, 0);

let group = 0;
for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
        if (inputGrid[row][col] === '#' && groupGrid[row][col] === 0) {
            group++;
            walk(row, col, group);
        }
    }
}

console.log(groupGrid.map(row => row.join(' ')).join('\n'));

console.log(`Group count: ${group}`);

function walk(row, col, group) {
    if (inputGrid[row][col] === '.') {
        return;
    }
    const r = groupGrid[row];
    if (r[col] !== 0) {
        return;
    }
    r[col] = group;

    // up
    if (row > 0) {
        walk(row - 1, col, group);
    }

    // down
    if (row < (size - 1)) {
        walk(row + 1, col, group);
    }

    // left
    if (col > 0) {
        walk(row, col - 1, group);
    }

    // right
    if (col < (size - 1)) {
        walk(row, col + 1, group);
    }
}

function makeGrid(size, v) {
    return (new Array(size))
    .fill([])
    .map(row => (new Array(size).fill(v))); 
}