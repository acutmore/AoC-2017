'use strict';

const input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8')
    .split(',');

/*
     +      +
      \0,-1/
  -1,0 +--+ 1,-1
      /    \
   --+      +--
      \    /
  -1,1 +--+  1,0
      /0,1 \
     +      + 
*/

const directions = {
    'n':  add([ 0,-1]),
    'ne': add([ 1,-1]),
    'se': add([ 1, 0]),
    's':  add([ 0, 1]),
    'sw': add([-1, 1]),
    'nw': add([-1, 0])
};

function add([x, y]) {
    return ([x2, y2]) => [x2+x, y2+y];
}

function distance([x, y]) {
    return Math.max(
        Math.abs(x),
        Math.abs(y),
        Math.abs(x + y)
    );
}

const start = { pos: [0,0], max: Number.NEGATIVE_INFINITY };

const end = input.reduce(({pos, max}, dir) => {
    pos = directions[dir](pos);
    max = Math.max(max, distance(pos));
    return {pos, max};
}, start);

console.log(distance(end.pos));
console.log(end.max);
