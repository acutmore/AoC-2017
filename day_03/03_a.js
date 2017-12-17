'use strict';
let size = 2;
let c = 2;
let y = 0;
let x = 1;
const target = 347991;

function check() {
    c++;
    if (c === target) {
        console.log({x, y});
        console.log(c);
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

