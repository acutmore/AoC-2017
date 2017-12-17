'use strict';

const length = 16;
const dancers = [];
for (let i = 0; i < length; i++) {
    dancers[i] = String.fromCharCode('a'.charCodeAt(0) + i);
}
const dancersBackUp = dancers.slice();

const data = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');
// const data = `s1,x3/4,pe/b`;

const input = data 
    .split(',')
    .map(command => {
        const move = command[0];
        const who = command
            .substring(1)
            .split('/');
        return { move, who };
    })
    .map(danceMove => {
        switch (danceMove.move) {
            case 's':
                danceMove.who[0] = Number.parseInt(danceMove.who[0]);
                break;
            case 'x':
                danceMove.who[0] = Number.parseInt(danceMove.who[0]);
                danceMove.who[1] = Number.parseInt(danceMove.who[1]);
                break;
            case 'p':
                break;
        }

        return danceMove;
    });

let offset = 0;

function dance() {
    for (let i = 0; i < input.length; i++) {
        const command = input[i];
        const move = command.move;
        const who = command.who;

        switch (move) {
            case 's': {
                const amount = who[0];
                offset = (offset - amount + length) % length;
                break;
            }
            case 'x': {
                const a = (who[0] + offset) % length;
                const b = (who[1] + offset) % length;
                const aP = dancers[b];
                const bP = dancers[a];
                dancers[a] = aP;
                dancers[b] = bP;
                break;
            }
            case 'p': {
                const a = dancers.indexOf(who[0]);
                const b = dancers.indexOf(who[1]);
                const aP = dancers[b];
                const bP = dancers[a];
                dancers[a] = aP;
                dancers[b] = bP;
                break;
            }
        }
    }
};

const states = new Map();

function stateCheck(i) {
    const state = `${offset} ${dancers.join(' ')}`;
    if (states.has(state)) {
        return states.get(state);
    } else {
        states.set(state, i);
        return null;
    }
}


let periodLength = undefined;
for (let i = 0; i < 10000; i++) {
    dance();
    const loopState = stateCheck(i);
    if (loopState === 0) {
        periodLength = i;
        break;
    }
}
if (periodLength === undefined) {
    throw new Error('Did not find loop length');
}

// RESET
offset = 0;
for (let i = 0; i < length; i++) {
    dancers[i] = dancersBackUp[i];
}

const oneBillion = 1000 * 1000 * 1000;
for (let i = 0; i < oneBillion % periodLength; i++) {
    dance();
}

function printResult() {
    const shifted = [];
    for (let i = 0; i < length; i++) {
        const index = (i + offset) % length;
        shifted.push(dancers[index]);
    }
    console.log(shifted.join(''));
}

printResult();