'use strict';

const INPUT = '18,1,0,161,255,137,254,252,14,95,165,33,181,168,2,188';

module.exports = hash;

function hash(input) {

    const inputLengths =
        input 
        .split('')
        .map(char => char.charCodeAt(0))
        .concat([17, 31, 73, 47, 23]);

    const sparseHash = (function SparseHash() {
        let buffer = new Array(256).fill(0).map((_, i) => i);
        let currentPosition = 0;
        let skipSize = 0;

        for (let i = 0; i < 64; i++) {
            inputLengths.forEach(length => {
                buffer = hashStage(buffer, currentPosition, length);
                currentPosition = (currentPosition + length + skipSize) % buffer.length;
                skipSize++;
            });
        }
        return buffer;
    })();

    const hash = reduceHashBySize(sparseHash, 16);

    return hash
        .map(v => v.toString(16))
        .map(v => v.length === 1 ? '0' + v : v)
        .join('');

    function hashStage(list, startingPosition, length) {
        list = list.slice();

        if (typeof length !== 'number') {
            throw new Error('nextLength invalid');
        }

        const contentsToReverse = [];

        for (let i = 0; i < length; i++) {
            contentsToReverse.push(list[
                (startingPosition + i) % list.length
            ]);
        }

        contentsToReverse.reverse();

        for (let i = 0; i < length; i++) {
            list[
                (startingPosition + i) % list.length
            ] = contentsToReverse[i];
        }

        return list;
    }

    function reduceHashBySize(list, size) {
        return list.reduce((acc, v, i) => {
            if (i % 16 === 0) {
                acc.push(0);
            }
            acc[acc.length -1] ^= v;
            return acc;
        }, []);
    }

}