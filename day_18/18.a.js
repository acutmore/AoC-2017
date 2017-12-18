'use strict';

const input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n');

const registers = new Array(26).fill(0);

function getReg(letter) {
    const index = letter.charCodeAt(0) - 'a'.charCodeAt(0);
    return registers[index];
}

function setReg(letter, value) {
    const index = letter.charCodeAt(0) - 'a'.charCodeAt(0);
    registers[index] = value;
}

function value(arg) {
    if (/[a-z]/.test(arg)) {
        return getReg(arg);
    } else {
        return Number.parseInt(arg);
    }
}

const sounds = [];

let infiniteLoopGuard = 0;

loop:
for (let ip = 0; ip < input.length && ip >= 0; ip++) {
    const line = input[ip];
    const [cmd, x, y] = line.split(' ');

    if (++infiniteLoopGuard > 10000) {
        console.log('loop guard hit');
        break;
    }

    switch (cmd) {
        case 'snd':
            sounds.push(value(x));
            break;
        case 'set':
            setReg(x, value(y));
            break;
        case 'add':
            setReg(x, getReg(x) + value(y));
            break;
        case 'mul':
            setReg(x, getReg(x) * value(y));
            break;
        case 'mod':
            setReg(x, getReg(x) % value(y));
            break;
        case 'rcv':
            if (value(x) !== 0) {
                console.log('recovery', sounds[sounds.length - 1]);
                break loop;
            }
            break;
        case 'jgz':
            if (value(x) > 0) {
                ip += value(y);
                ip--; // negate loop counter;
            } 
            break;
    }
};

console.log('HALT');