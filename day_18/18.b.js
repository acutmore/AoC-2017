'use strict';

const input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n');

async function runProgram(name, snd, rcv) {
    const registers = new Array(26).fill(0);

    setReg('p', Number.parseInt(name));

    function getReg(letter) {
        const index = letter.charCodeAt(0) - 'a'.charCodeAt(0);
        if (index > 25 || index < 0) {
            throw new Error('illegal register');
        }
        return registers[index];
    }

    function setReg(letter, value) {
        const index = letter.charCodeAt(0) - 'a'.charCodeAt(0);
        if (index > 25 || index < 0) {
            throw new Error('illegal register');
        }
        registers[index] = value;
    }

    function value(arg) {
        if (/[a-z]/.test(arg)) {
            return getReg(arg);
        } else {
            return Number.parseInt(arg);
        }
    }

    let instructionsExecuted = 0;

    loop:
    for (let ip = 0; ip < input.length && ip >= 0; ip++) {
        instructionsExecuted++;
        if (instructionsExecuted % 5000) {
            // yield cpu
            await (new Promise(resolve => setTimeout(resolve)));
        }

        const line = input[ip];
        const [cmd, x, y] = line.split(' ');

        switch (cmd) {
            case 'snd':
                snd(value(x));
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
                setReg(x, await rcv());
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
}

function recieve(name, input) {
    return function rcv() {
        if (input.length > 0) {
            const v = input.shift();
            return Promise.resolve(v);
        } else {
            return new Promise(resolve => {
                console.log(`${name} waiting`);
                input.onAdd.push(resolve);
            })
            .then(() => {
                console.log(`${name} not waiting`);
                return rcv();
            });
        }
    };
}

function send(name, outbox) {
    return function snd(v) {
        outbox.push(v);
        outbox.count++;
        outbox.onAdd.forEach(r => r());
        outbox.onAdd.length = 0;
    };
}

function box() {
    const b = [];
    b.onAdd = [];
    b.count = 0;
    return b;
}

const aOut = box();
const bOut = box();

runProgram('0', send('0', aOut), recieve('0', bOut));
runProgram('1', send('1', bOut), recieve('1', aOut));

setInterval(() => {
    console.log('a', aOut.count, aOut.length);
    console.log('b', bOut.count, bOut.length);
}, 5 * 1000);
