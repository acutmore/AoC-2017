'use strict';
const input = require('fs').readFileSync(__dirname + '/input.txt', 'utf8');

const graph = Object.create(null);

function getOrCreateNode(id) {
    if (id in graph) {
        return graph[id];
    }
    const node = new Set(); 
    graph[id] = node;
    return node;
}

input
    .split('\n')
    .map(line => {
        const parts = line.split(' ');
        const a = Number.parseInt(parts[0]);
        const bs = parts.slice(2).map(v => Number.parseInt(v))
        return { a, bs };
    })
    .forEach(edges => {
        const a = edges.a;
        const bs = edges.bs;

        const nodeA = getOrCreateNode(a);
        bs.forEach(b => {
            const bNode = getOrCreateNode(b);
            nodeA.add(b);
            bNode.add(a);
        });
    });

const visited = new Set();
let count = 0;
visit(0, { incrementCounter: true });

function visit(id, opts) {
    if (visited.has(id)) {
        return;
    }
    visited.add(id);
    if (opts && opts.incrementCounter) {
        count++;
    }
    const node = graph[id];
    node.forEach(visit);
}

console.log(count);

let groups = 1;

Object.keys(graph)
    .map(v => Number.parseInt(v))
    .forEach(id => {
        if (visited.has(id)) {
            return;
        }
        groups++;
        visit(id);
    });

console.log(groups);
