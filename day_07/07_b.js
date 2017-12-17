'use strict';
const input = require('fs')
    .readFileSync(__dirname + '/input2.txt', 'utf8')
    .split('\n');

function parseLine(line) {
    const tokens = line.split(' ');
    const name = tokens[0];
    const weight = Number.parseInt(tokens[1].replace(/[()]/g, ''));
    const above = [];
    for (let i = 3; i < tokens.length; i++) {
        above.push(tokens[i].replace(',', ''));
    }

    return { name, weight, above };
}

const nodes = input.map(v => parseLine(v));
const nodeLookUp = Object.create(null);
nodes.forEach(n => {
    nodeLookUp[n.name] = n;
});

const root = nodes.find((possibleRoot, index, arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (i === index) {
            continue;
        }
        const n = arr[i];
        if (n.above.indexOf(possibleRoot.name) !== -1) {
            return false;
        }
    }
    return true;
});

function weigh(node) {
    const sum = node.above
        .reduce((acc, name) => acc + weigh(nodeLookUp[name]), 0)
        + node.weight;
    node.sum = sum;
    return sum;
}

weigh(root);

function findUnBalanced(nodesNames) {
    return nodesNames.find((v, index, arr) => {
        const aboveNode = nodeLookUp[v];
        let sameCount = 0;
        for (let i = 0; i < arr.length; i++) {
            if (i === index) {
                continue;
            }
            const aboveNode2 = nodeLookUp[arr[i]];
            if (aboveNode2.sum === aboveNode.sum) {
                sameCount++;
            }
        }
        return sameCount === 0;
    });
}

function investigateUnbalanced(nodeName) {
    if (nodeName === undefined) {
        return;
    }
    const node = nodeLookUp[nodeName];
    const different = findUnBalanced(node.above);
    if (different === undefined) {
        return node.name;
    }
    return investigateUnbalanced(different);
}

const unbalanced = investigateUnbalanced(findUnBalanced(root.above));
console.log(unbalanced);

const parent = nodes.find(n => {
    return n.above.indexOf(unbalanced) !== -1;
});

const unbalancedWeight = nodeLookUp[unbalanced].weight;
const unbalancedSum = nodeLookUp[unbalanced].sum;
const siblingSum = parent.above
    .map(v => nodeLookUp[v])
    .filter(n => n.name !== unbalanced)
    .map(n => n.sum)
    [0];

console.log(unbalancedWeight + (siblingSum - unbalancedSum));
