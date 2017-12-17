'use strict';
const input = require('fs')
    .readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n');

function parseLine(line) {
    const parts = line.split(' ');
    const outputReg = parts[0];
    const instruction = parts[1];
    const amount = Number.parseInt(parts[2]);
    const lhsReg = parts[4];
    const op = parts[5];
    const rhsAmount = Number.parseInt(parts[6]);

    return { outputReg, instruction, amount, lhsReg, op, rhsAmount };
}

function initalise(reg) {
    return `
if (! ('${reg}' in registers)) {
  registers['${reg}'] = 0;
}
`
}

function transformIntoJs(p) {
   return `
${initalise(p.lhsReg)}
${initalise(p.outputReg)}

if (registers['${p.lhsReg}'] ${p.op} ${p.rhsAmount}) {
    registers['${p.outputReg}'] ${ p.instruction === 'dec' ? '-=' : '+=' } ${p.amount};    
}
maxValue = Math.max(maxValue, stdLib.maxReg(registers));
`;
}

const jsProgram = `
var registers = Object.create(null);
var maxValue = Number.NEGATIVE_INFINITY;
` + (input.map(line => {
    return transformIntoJs(
        parseLine(line)
    );
}).join('')) + `
return maxValue;
`;

const compiled = new Function('stdLib', jsProgram);

function maxRegValue(registers) {
    return Object.keys(registers)
        .map(reg => registers[reg])
        .reduce((a, b) => Math.max(a, b), 0);
}

const maxValue = compiled({ maxReg: maxRegValue });

console.log(maxValue);