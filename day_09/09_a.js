'use strict';

function count(groups, score) {
    return groups.reduce((acc, innerGroup) => {
        return acc + score + count(innerGroup, score + 1);
    }, 0);
}

function root(input) {
    const groups = [];
    const it = input[Symbol.iterator]();
    group(it, groups);
    return count(groups, 1);
}

function group(it, groups) {
    for (;;) {
        let c = it.next().value;
        if (c === undefined) {
            return;
        }
        switch (c) {
            case '{': // start group
                {
                    const innerGroups = [];
                    groups.push(innerGroups);
                    group(it, innerGroups);
                }
                break;
            case '}': // end group
                return;
            case '<': // start garbage
                garbage(it);
                break;
            case '!': // ignore next
                it.next();
                break;
            default:
                break;
        }
    }
}

let garbageCount = 0;

function garbage(it) {
    for (;;) {
        let c = it.next().value;
        if (c === undefined) {
            return;
        }
        switch (c) {
            case '>': // end garbage
                return;
            case '!': // ignore next
                it.next();
                break;
            default: // garbage
                garbageCount++;
                break;
        }
    }
}


function test(input, groups) {
    const o = root(input);
    if (o === groups) {
        return true;
    } else {
        return `expected ${groups} got ${o}`;
    }
}

// console.log(test(`{}`, 1));
// console.log(test(`{{{}}}`, 6));
// console.log(test(`{{},{}}`, 5));
// console.log(test(`{{{},{},{{}}}}`, 16));
// console.log(test(`{<{},{},{{}}>}`, 1));
// console.log(test(`{<a>,<a>,<a>,<a>}`, 1));
// console.log(test(`{{<a>},{<a>},{<a>},{<a>}}`, 9));
// console.log(test(`{{<!>},{<!>},{<!>},{<a>}}`, 3));

const input = require('fs')
    .readFileSync(__dirname + '/input.txt', 'utf8');
console.log(root(input));
console.log(garbageCount);