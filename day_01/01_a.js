input.split('')
    .map((a, i, l) => [a, l[(i + 1) % l.length]])
    .map(([p1, p2]) => [Number(p1), Number(p2)])
    .reduce((a, [p1, p2]) => p1 === p2 ? a + p1 : a, 0)