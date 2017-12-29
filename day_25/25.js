'use strict';

const tape = [];
let index = 0;

// Begin in state A.
// Perform a diagnostic checksum after 12172063 steps.

let state = A;
for (let i = 0; i < 12172063; i++) {
    state = state();
}

console.log(diagnostic());

// In state A:
//   If the current value is 0:
//     - Write the value 1.
//     - Move one slot to the right.
//     - Continue with state B.
//   If the current value is 1:
//     - Write the value 0.
//     - Move one slot to the left.
//     - Continue with state C.
function A() {
    if (tape[index] !== 1) {
        tape[index] = 1;
        index += 1;
        return B;
    } else {
        tape[index] = 0;
        index -= 1;
        return C;
    }
}

// In state B:
//   If the current value is 0:
//     - Write the value 1.
//     - Move one slot to the left.
//     - Continue with state A.
//   If the current value is 1:
//     - Write the value 1.
//     - Move one slot to the left.
//     - Continue with state D.
function B() {
    if (tape[index] !== 1) {
        tape[index] = 1;
        index -= 1;
        return A;
    } else {
        index -= 1;
        return D;
    }
}

// In state C:
//   If the current value is 0:
//     - Write the value 1.
//     - Move one slot to the right.
//     - Continue with state D.
//   If the current value is 1:
//     - Write the value 0.
//     - Move one slot to the right.
//     - Continue with state C.
function C() {
    if (tape[index] !== 1) {
        tape[index] = 1;
        index += 1;
        return D;
    } else {
        tape[index] = 0;
        index += 1;
        return C;
    }
}

// In state D:
//   If the current value is 0:
//     - Write the value 0.
//     - Move one slot to the left.
//     - Continue with state B.
//   If the current value is 1:
//     - Write the value 0.
//     - Move one slot to the right.
//     - Continue with state E.
function D() {
    if (tape[index] !== 1) {
        index -= 1;
        return B;
    } else {
        tape[index] = 0;
        index += 1;
        return E;
    }
}

// In state E:
//   If the current value is 0:
//     - Write the value 1.
//     - Move one slot to the right.
//     - Continue with state C.
//   If the current value is 1:
//     - Write the value 1.
//     - Move one slot to the left.
//     - Continue with state F.
function E() {
    if (tape[index] !== 1) {
        tape[index] = 1;
        index += 1;
        return C;
    } else {
        index -= 1;
        return F;
    }
}

// In state F:
//   If the current value is 0:
//     - Write the value 1.
//     - Move one slot to the left.
//     - Continue with state E.
//   If the current value is 1:
//     - Write the value 1.
//     - Move one slot to the right.
//     - Continue with state A.
function F() {
    if (tape[index] !== 1) {
        tape[index] = 1;
        index -= 1;
        return E;
    } else {
        index += 1;
        return A;
    }
}

// count the number of times 1 appears on the tape.
function diagnostic() {
    return Object.keys(tape)
        .map(key => tape[key] === 1 ? 1 : 0)
        .reduce((acc, v) => acc + v, 0);
}
