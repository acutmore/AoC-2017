'use strict';
const generator_a_factor = 16807;
const generator_a_start = 703;
const generator_b_factor = 48271;
const generator_b_start = 516;
const modulo = 2147483647;

function* sequence(factor, modulo, seed, guard) {
    let prev = seed;
    while (true) {
        const next = (prev * factor) % modulo;
        if ((next % guard) === 0) {
            yield next;
        }
        prev = next;
    }
}

function lowerBits(num) {
    return num & 0xffff;
}

const gen_a = sequence(generator_a_factor, modulo, generator_a_start, 4);
const gen_b = sequence(generator_b_factor, modulo, generator_b_start, 8);

let matches = 0;
for (let i = 0; i < 5000000; i++) {
    const a = lowerBits(gen_a.next().value);
    const b = lowerBits(gen_b.next().value);
    if (a === b) {
        matches++;
    }
}

console.log(matches);