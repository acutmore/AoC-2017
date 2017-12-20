'use strict';
const INPUT = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

const DATA = INPUT
    .split('\n')
    .map((line, lineNumber) => line
        .split(/[a-z]=/)
        .filter(v => v.trim().length > 0)
        .map(v => v.match(/-?[0-9]+/g)
            .reduce((acc, v, i) => {
                switch (i) {
                    case 0: acc['x'] = Number.parseInt(v); break;
                    case 1: acc['y'] = Number.parseInt(v); break;
                    case 2: acc['z'] = Number.parseInt(v); break;
                }
                return acc;
            }, {})
        )
        .reduce((acc, v, i) => {
            switch (i) {
                case 0: acc['p'] = v; break;
                case 1: acc['v'] = v; break;
                case 2: acc['a'] = v; break;
            }
            return acc;
        }, { index: lineNumber })
    );

const slowest = DATA.reduce((a, b) => {
    const lA = length(a.a);
    const lB = length(b.a);
    if (lA < lB) {
        return a;
    }
    return b;
});

console.log(slowest.index);

let remaining = DATA;

for (let i = 0; i < 1e4; i++) {
    let counts = {};
    remaining.forEach(p => {
        p.v.x += p.a.x;
        p.v.y += p.a.y;
        p.v.z += p.a.z;
        p.p.x += p.v.x;
        p.p.y += p.v.y;
        p.p.z += p.v.z;
        const pos = `${p.p.x} ${p.p.y} ${p.p.z}`;
        p.pos = pos;
        if (pos in counts) {
            counts[pos]++;
        } else {
            counts[pos] = 1;
        }
    });
    remaining = remaining.filter(p => {
        return counts[p.pos] === 1;
    });
}

console.log(remaining.length);

function length(v) {
    return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2) + Math.pow(v.z, 2));
}
