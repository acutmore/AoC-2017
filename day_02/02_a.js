input.split('\n')
  .map(row => row.split(`\t`))
  .map(row => row
    .map(x => Number.parseInt(x))
    .reduce((a, v) => {
      if (v < a.min) a.min = v;
      if (v > a.max) a.max = v;
      return a;
    }, { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY })
  )
  .map(({min, max}) => max - min)
  .reduce((a, b) => a + b, 0)