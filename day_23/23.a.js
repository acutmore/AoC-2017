'use strict';
const INPUT = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

const registers = new Array(8).fill(0);

const program = INPUT
    .split('\n')
    .map(line => line.split(' '))
    .map(([ins, arg1, arg2]) => [ins, createGetSet(arg1), createGetSet(arg2)]);

let mulCount = 0;
let pc = 0;
for (let i = 0; i < 1e6; i++) {
    if (pc < 0 || pc >= program.length) {
        console.log(`halted after ${i} instructions`);
        break;
    }
    const [ins, arg1, arg2] = program[pc];
    switch (ins) {
        case 'set':
            arg1.set(arg2.get());
            break;
        case 'sub':
            arg1.set( arg1.get() - arg2.get() );
            break;
        case 'mul':
            mulCount += 1;
            arg1.set( arg1.get() * arg2.get() );
            break;
        case 'jnz':
            if (arg1.get() !== 0) {
                pc = pc + arg2.get() - 1;
            }
            break;
        default:
            throw new Error(`unknown instruction: ${ins}`);
    }
    pc += 1;
}

console.log(mulCount);

function createGetSet(x) {
    if (/[a-z]/.test(x)) {
        const reg = x.charCodeAt(0) - 'a'.charCodeAt(0);
        return {
            get: () => registers[reg],
            set: (v) => registers[reg] = v
        };
    } else {
        const v = Number.parseInt(x);
        return {
            get: () => v,
            set: () => { throw new Error('Not possible to set to a constant'); }
        };
    }
}
