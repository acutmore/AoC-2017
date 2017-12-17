'use strict';
let size = 2;
let y = 0;
let x = 1;
const target = 347991;
const grid = {
    [`0-0`]: 1,
    [`1-0`]: 1
};

function check() {
    const adjacents = [
        `${x-1}-${y+1}`,`${x}-${y+1}`,`${x+1}-${y+1}`,
        `${x-1}-${y}`,                `${x+1}-${y}`,
        `${x-1}-${y-1}`,`${x}-${y-1}`,`${x+1}-${y-1}`,
    ];
    const sum = adjacents.map(position => grid[position] || 0).reduce((a, b) => a + b, 0);
    grid[`${x}-${y}`] = sum;
    if (sum > target) {
        console.log({x, y});
        console.log(sum);
        throw 'stopped';
    }
}

function loop() {
    // up
    for (let i = 0; i < size - 1; i++) {
        y += 1;
        check();
    }
    // across
    for (let i = 0; i < size; i++) {
        x -= 1;
        check();
    }
    // down
    for (let i = 0; i < size; i++) {
        y -= 1;
        check();
    }
    // across
    for (let i = 0; i < size; i++) {
        x += 1;
        check();
    }
    // start new square
    x += 1;
    check();
    size += 2;
}

while (true) {
    loop();
}

