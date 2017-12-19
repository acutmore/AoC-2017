'use strict';

const INPUT = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');
const grid = INPUT.split('\n');

const DIR = {
    N: { x:  0, y: -1 },
    S: { x:  0, y:  1 },
    E: { x:  1, y:  0 },
    W: { x: -1, y:  0 },
};

const letters = [];
const characterCount = grid
    .map(line => line.split('').reduce((acc, c) => /[A-Z]/.test(c) ? acc + 1 : acc, 0))
    .reduce((acc, count) => acc + count, 0);
const bound = 1e8;

let i = 0;
let position = startingPoint(grid);
let direction = DIR.S;
for (; i <= bound; i++) {
    if (i === bound) {
        throw new Error('loop bound hit');
    }
    position = add(position, direction);
    const {x, y} = position;
    const n = grid[y][x];
    if (n === undefined || n === ' ') {
        console.log('done');
        break;
    }
    if (/[A-Z]/.test(n)) {
        letters.push(n);
        if (letters.length > characterCount) {
            throw new Error('finding too many letters');
        }
        continue;
    }
    if (n === '-' || n === '|') {
        continue;
    }
    if (n === '+') {
        direction = findPath({ position, comeFrom: opposite(direction) });
        if (direction === undefined) {
            console.log('no more path');
            break;
        }
    }
}

console.log(letters.join(''));
console.log(i + 1);

function startingPoint(grid) {
    return {
        x: grid[0].indexOf('|'),
        y: 0
    };
}

function next(position, direction) {
    const { x, y } = add(position, direction);
    return grid[y][x];
}

function add({ x, y }, { x: x2, y: y2 }) {
    return { x: x + x2, y: y + y2 };
}

function findPath({position, comeFrom}) {
    return Object.keys(DIR)
        .map(k => DIR[k])
        .filter(({x, y}) => !(x === comeFrom.x && y === comeFrom.y))
        .find(dir => {
            const space = next(position, dir);
            if (/[A-Z]/.test(space)) {
                return true;
            }

            if (space === '|') {
                return dir.x === 0;
            }

            if (space === '-') {
                return dir.y === 0;
            }

            if (space === '+') {
                return true;
            }

            return false;
        });
}

function opposite({x, y}) {
    return { x: -x, y: -y };
}