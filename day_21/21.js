'use strict';

const INPUT = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

const START =
`.#./` +
`..#/` +
`###`;

const rules = new Map();
{
    const ruleSet = new Set();
    INPUT.split('\n')
        .forEach((line, i) => {
            const [lhs, rhs] = line.split(' => ');
            const outputGrid = gridFromString(rhs);
            for (const v of variantsOf(gridFromString(lhs))) {
                const vS = v.toString();
                if (! ruleSet.has(vS)) {
                    ruleSet.add(vS);
                    rules.set(v, outputGrid);
                }
            }
        });
}

let grid = gridFromString(START);
console.time();
for (let i = 0; i < 18; i++) {
    const outputs = [];
    for (const inner of split(grid)) {
        for (const [rule, output] of rules.entries()) {
            if (match(inner, rule)) {
                outputs.push(output);
            }
        }
    }
    grid = expand(outputs);
}
console.log(countMatches(grid, true)); // 2766750
console.timeEnd(); // 11310.135ms

function gridFromString(str) {
    return str
        .split('/')
        .map(line => line.split('').map(c => {
            switch (c) {
                case '.': return false;
                case '#': return true;
                default: throw new Error('invalid char: ' + c);
            }
        }))
}

function* split(grid) {
    const size = gridSize(grid); 
    const factor = (size % 2 === 0) ? 2 : 3;
    for (const [x, y] of innerStartPositions(size, factor)) {
        yield innerSquare(grid, factor, x, y);
    }
}

function innerSquare(grid, size, line, row) {
    const retVal = makeGrid(size);
    for (let i = 0; i < size; i++) {
        for (let k = 0; k < size; k++) {
            retVal[i][k] = grid[line + i][row + k];
        }
    }
    return retVal;
}

function* innerStartPositions(outerSize, innerSize) {
    for (let i = 0; i < outerSize; i += innerSize) {
        for (let k = 0; k < outerSize; k += innerSize) {
            yield [i, k];
        }
    } 
}

function match(gridA, gridB) {
    const size = gridSize(gridA); 
    if (gridSize(gridB) !== size) {
        return false;
    }
    for (let i = 0; i < size; i++) {
        for (let k = 0; k < size; k++) {
            if (gridA[i][k] !== gridB[i][k]) {
                return false;
            }
        }
    }
    return true;
}

function* variantsOf(grid) {
    yield* rotations(grid);
    yield* rotations(flipH(grid));
    yield* rotations(flipV(grid));
}

function* rotations(grid) {
    let r = grid;
    yield r;
    yield r = rotate(r);
    yield r = rotate(r);
    yield     rotate(r); 
}

function rotate(grid) {
    const size = gridSize(grid);
    const retVal = makeGrid(size);
    for (let i = 0; i < size; i++) {
        for (let k = 0; k < size; k++) {
            retVal[i][k] = grid[size - k - 1][i];
        }
    }
    return retVal;
}

function flipH(grid) {
    return grid
        .map(line => line.slice().reverse());
}

function flipV(grid) {
    return grid.slice().reverse();
}

function gridSize(grid) {
    return grid[0].length;
}

function makeGrid(size) {
    return new Array(size)
        .fill([])
        .map(() => new Array(size).fill(undefined));
}

function expand(innerGrids) {
    const innerGridsSize = Math.sqrt(innerGrids.length);
    const innerSize = gridSize(innerGrids[0]);
    const size = innerGridsSize * innerSize; 
    const retVal = makeGrid(size);
    let gridI = 0;
    for (const [x, y] of innerStartPositions(size, innerSize)) {
        for (let i = 0; i < innerSize; i++) {
            for (let k = 0; k < innerSize; k++) {
                retVal[x + i][y + k] = innerGrids[gridI][i][k];
            }
        }
        gridI++;
    }
    return retVal;
}

function countMatches(grid, value) {
    return grid
        .map(row => row.reduce((acc, v) => v === value ? acc + 1 : acc))
        .reduce((acc, v) => acc + v, 0);
}