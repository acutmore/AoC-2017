input.split('\n')
  .map(row => row.split('	'))
  .map(row => row.map(x => Number.parseInt(x)).sort((a, b) => b - a))
  .map(list => {
    var pairs = [];
    list.forEach((v, i , l) => {
      pairs = pairs.concat(l.slice(i + 1).map(v2 => [v, v2]))
    });
    return pairs.map(([a, b]) => a / b).filter(result => Math.round(result) === result)[0]
  })
  .reduce((a, b) => a + b, 0)